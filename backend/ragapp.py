from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import pandas as pd

from langchain.vectorstores import FAISS
from langchain.embeddings import GoogleGenerativeAIEmbeddings
from langchain.document_loaders import DataFrameLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.embeddings import GoogleEmbeddings


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 🧠 Load and Embed Jobs CSV
df = pd.read_csv("jobs.csv")  # Use your job CSV
df = df.fillna("")  # Handle NaNs
df["content"] = df.apply(lambda row: f"{row['jobTitle']} at {row['organizationName']}, located in {row['jobLocation']}.\n\n{row['jobDescription']}", axis=1)

loader = DataFrameLoader(df[["content"]], page_content_column="content")
docs = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
chunks = splitter.split_documents(docs)

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GEMINI_API_KEY)

db = FAISS.from_documents(chunks, embeddings)
retriever = db.as_retriever(search_kwargs={"k": 3})


memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
qa_chain = ConversationalRetrievalChain.from_llm(
    ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=GEMINI_API_KEY),
    retriever=retriever,
    memory=memory
)

# 🌸 Flask App
app = Flask(__name__)
CORS(app)

# Asha Didi Fallback Chat
from google.generativeai import GenerativeModel
import google.generativeai as genai
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    system_instruction="""
You are Asha Didi, a friendly mentor helping women with career advice, job search, and motivation in Hinglish.
If the query is gender-biased, gently explain why it’s inappropriate and guide positively.
""",
)

chat_session = model.start_chat(history=[])

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message", "")

    intent_check = model.generate_content(f"Classify this query: '{user_message}'. Is it about a job search? Answer only Yes or No.")
    intent = intent_check.text.strip().lower()

    if "yes" in intent:
        response = qa_chain.run(user_message)
    else:
        # General Chat
        response = chat_session.send_message(user_message).text

    return jsonify({'reply': response})


@app.route('/reset', methods=['POST'])
def reset():
    global chat_session
    chat_session = model.start_chat(history=[])
    memory.clear()
    return jsonify({'message': 'Chat session reset successfully.'})


if __name__ == '__main__':
    app.run(debug=True)
