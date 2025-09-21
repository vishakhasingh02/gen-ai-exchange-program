from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai
import json

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

system_instruction = """
You are Asha, an AI-powered virtual assistant and mentor for the JobsForHer Foundation, lovingly known as "Asha Didi" by young women navigating their professional journeys. You speak in a warm, approachable, encouraging tone—like an elder sister guiding girls through careers, opportunities, and life decisions. Making sure the tone remains positive and respectful.

Your mission is to empower women by providing helpful, honest, and motivating responses. You assist users in exploring job opportunities, mentorship programs, community events, and career sessions—especially those focused on women empowerment and inclusion.

🌸 Important Guidelines:
- Address users with care, encouragement, and respect, as if you are a mentor and well-wisher.
- Use Hinglish in responses naturally.
- If a query includes or implies gender bias, politely redirect the conversation and explain the importance of inclusivity and respect.
- Never promote stereotypes or make assumptions about users based on gender or background.
- Prioritize verified, accurate information related to jobs, mentorship, events, and growth opportunities for women.
- Be context-aware and remember user preferences during the session to provide coherent multi-turn conversations.

Remember, your core values are empathy, empowerment, inclusivity, and ethical intelligence.
Your tone = helpful + inspiring + didi vibes. ✨
"""

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction=system_instruction
)

# Load job data from jobs.json
with open("jobs.json", "r", encoding="utf-8") as f:
    job_data = json.load(f)
# Flask app setup
app = Flask(__name__)
CORS(app)

# Initialize chat session and history
chat_session = model.start_chat(history=[])
chat_history = []

# Helper function to search jobs
def search_jobs(query, history):
    # Combine history and current query for context-aware search
    combined_query = " ".join(history + [query]).lower()

    matched_jobs = []
    for job in job_data:
        title = job.get("jobTitle", "").lower()
        location = " ".join(job.get("jobLocation", [])).lower()
        description = job.get("jobDescription", "").lower()
        skills = " ".join(job.get("requiredSkills", [])).lower()

        if any(q in title or q in location or q in description or q in skills for q in combined_query.split()):
            matched_jobs.append({
                "id": job.get("_id", ""),
                "jobTitle": job.get("jobTitle", ""),
                "location": job.get("jobLocation", []),
                "organizationName": job.get("organizationName", "Confidential"),
                "workingHours": job.get("workingHoursPerWeek", "Not specified"),
                "experience": f"{job.get('minimumRequiredExperienceInYears', 0)} to {job.get('maximumRequiredExperienceInYears', 0)} years",
                "skills": job.get("requiredSkills", [])
            })
    return matched_jobs[:5]  # Return top 5 matches

@app.route('/chat', methods=['POST'])
def chat():
    global chat_history
    user_msg = request.json.get("message", "")
    chat_history.append(user_msg)

    # Check if the query is job-related
    job_keywords = ["job", "career", "vacancy", "openings", "hire", "internship", "work", "remote"]
    if any(word in user_msg.lower() for word in job_keywords):
        results = search_jobs(user_msg, chat_history)
        print(results)
        if results:
            return jsonify({
                "type": "job_results",
                "jobs": results,
                "reply": f"Mujhe ye kuch jobs mili jo shayad aapke liye sahi ho sakti hain 🌟"
            })
        else:
            return jsonify({
                "type": "text",
                "reply": "Filhaal koi matching job nahi mili Asha Didi ko 😕. Please aur specific location ya skills batao!"
            })

    # For non-job queries, use Google Generative AI
    response = chat_session.send_message(user_msg)
    return jsonify({
        "type": "text",
        "reply": response.text
    })

@app.route('/job/<job_id>', methods=['GET'])
def get_job_detail(job_id):
    job = next((j for j in job_data if j["_id"] == job_id), None)
    if job:
        return jsonify(job)
    return jsonify({"error": "Job not found"}), 404

@app.route('/reset', methods=['POST'])
def reset():
    global chat_session, chat_history
    chat_session = model.start_chat(history=[])
    chat_history = []
    return jsonify({'message': 'Chat reset successfully.'})

if __name__ == '__main__':
    app.run(debug=True)
