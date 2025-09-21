import os
import pandas as pd

from langchain.vectorstores import FAISS
from langchain.embeddings import GoogleGenerativeAIEmbeddings
from langchain.chat_models import ChatGoogleGenerativeAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.document_loaders import DataFrameLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.schema import Document


# === Step 1: Load CSV data ===
df = pd.read_csv("jobs.csv")

# Optional: Combine relevant columns into one text field
df["text"] = df[["Job Title", "Location", "Description"]].astype(str).agg(" | ".join, axis=1)

# === Step 2: Convert to LangChain documents ===
documents = [Document(page_content=row["text"], metadata=row.drop("text").to_dict()) for _, row in df.iterrows()]

# === Step 3: Split & Embed ===
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
docs = text_splitter.split_documents(documents)

embedding_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vectorstore = FAISS.from_documents(docs, embedding_model)

retriever = vectorstore.as_retriever()

# === Step 4: Setup LLM and memory ===
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

rag_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory,
    verbose=True
)

# === Step 5: Run Chat Interface ===
print("\n💬 Job Search Chatbot (type 'exit' to quit)\n")

while True:
    query = input("You: ")
    if query.lower() in ("exit", "quit"):
        break

    response = rag_chain.run(query)
    print("Asha AI:", response)
