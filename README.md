# Chatbot Practise Project

This project is a chatbot application powered by FastAPI for the backend and Next.js for the frontend. The backend uses the Groq API to generate responses, and the frontend provides an interactive UI for users to chat with the bot.

## Project Structure

```
chatbot-practise/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
├── frontend/
│   ├── components/
│   │   ├── Chatbot.tsx
│   ├── pages/
│   │   ├── index.tsx
│   ├── styles/
│   │   ├── globals.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── package.json
├── README.md
```

## Backend Setup

1. **Navigate to the backend directory**:
   ```sh
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```sh
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   ```

3. **Install the dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   Ensure you have a `.env` file with the following content:
   ```dotenv
   GROQ_API_KEY=your_groq_api_key
   ```

5. **Run the FastAPI application**:
   ```sh
   python main.py
   ```

The backend will be running at `http://0.0.0.0:8000`.

## Frontend Setup

1. **Navigate to the frontend directory**:
   ```sh
   cd frontend
   ```

2. **Install the dependencies**:
   ```sh
   npm install
   ```

3. **Run the Next.js development server**:
   ```sh
   npm run dev
   ```

The frontend will be running at `http://localhost:3000`.

## Using the Chatbot

1. Open your browser and navigate to `http://localhost:3000`.
2. You will see an interactive chatbot UI.
3. Type your message and press Enter or click the "Send" button to interact with the chatbot.

## API Endpoints

### `GET /`

Returns a welcome message.

### `POST /chat`

Accepts a JSON payload with the user's message and chat history, and returns a response from the chatbot.

**Request Body**:
```json
{
  "message": "Your message here",
  "history": ["Previous message 1", "Previous message 2"]
}
```

**Response**:
```json
{
  "response": "Chatbot's response"
}
```

## License

This project is licensed under the MIT License.
