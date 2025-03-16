# AI Chat Interface

A modern, interactive chat application built with Next.js and FastAPI, powered by Groq's LLM API.

![Chat Interface Preview]
*(You can add a screenshot of your application here)*

## Features

- 💬 Real-time chat interface with message bubbles
- 🎨 Modern and responsive design
- 🌓 Dark mode support
- ⚡ Fast responses powered by Groq's LLM
- 🔄 Message history tracking
- 📱 Mobile-friendly interface

## Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Geist Font](https://vercel.com/font) - Modern typography

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) - Python web framework
- [Groq](https://groq.com/) - LLM API provider
- [Python 3.x](https://www.python.org/) - Backend language
- [uvicorn](https://www.uvicorn.org/) - ASGI server

## Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.x
- Groq API key

### Environment Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chatbot-practise
```

2. Backend setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Create a `.env` file in the backend directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

4. Frontend setup:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```
The API will be available at `http://localhost:8000`

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
