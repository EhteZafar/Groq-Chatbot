"use client";

import { useState, useRef, useEffect } from "react";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";

interface Message {
  content: string;
  isUser: boolean;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
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
      const aiMessage = { content: data.response, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
        <MessageForm message={message} setMessage={setMessage} handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
