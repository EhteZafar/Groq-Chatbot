"use client";

import { useState, useRef, useEffect } from "react";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import Header from "../components/Header";

interface Message {
  content: string;
  isUser: boolean;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ content: "Ask me anything about Pakistani cuisine, recipes, and cooking tips!", isUser: false }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { content: message, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: messages.map((msg) => msg.content),
        }),
      });

      const data = await res.json();
      const aiMessageContent = data.response;
      let aiMessage = { content: aiMessageContent, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false); // Stop showing the loading indicator
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Stop showing the loading indicator in case of error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header />
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-1 p-4 sm:p-6 flex flex-col h-[80vh]">
          <div className="flex-1 overflow-y-auto mb-4 p-4 custom-scrollbar">
            <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
          </div>
          <MessageForm message={message} setMessage={setMessage} handleSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
