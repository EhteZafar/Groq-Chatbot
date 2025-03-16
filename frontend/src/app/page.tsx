"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newHistory = [...history, message];
    setHistory(newHistory);
    setMessage("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, history: newHistory }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-4 items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded"
            rows={4}
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Send
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-lg font-bold">Chat History</h2>
          <ul className="list-disc pl-5">
            {history.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          {response && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Response</h2>
              <p>{response}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
