from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from groq import Groq
import os
from dotenv import load_dotenv
import markdown
import bleach
from prompts import SYSTEM_PROMPT  # Import the prompt from prompts.py

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Pakistani Chef AI")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable is not set")

try:
    client = Groq(api_key=api_key)
except TypeError as e:
    raise ValueError(f"Error initializing Groq client: {e}")

class ChatMessage(BaseModel):
    message: str
    history: List[str] = []

class ChatResponse(BaseModel):
    response: str

@app.get("/")
async def root():
    return {"message": "Welcome to the Pakistani Chef AI API"}

@app.post("/chat", response_model=ChatResponse)
async def chat(chat_message: ChatMessage):
    try:
        # Prepare the messages for the Groq API
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Limit history to the last 5 messages to prevent excessive token usage
        conversation_history = chat_message.history[-5:]

        # Add conversation history
        for msg in conversation_history:
            messages.append({"role": "user", "content": msg})

        # Add the current message
        messages.append({"role": "user", "content": chat_message.message})

        # Call Groq API
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            max_tokens=1024,
        )

        # Extract the response
        response = chat_completion.choices[0].message.content

        # Convert Markdown to HTML
        formatted_html = markdown.markdown(response)

        # Sanitize HTML to prevent XSS attacks
        safe_html = bleach.clean(formatted_html, tags=["b", "i", "strong", "em", "p", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6"])

        return ChatResponse(response=safe_html)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
