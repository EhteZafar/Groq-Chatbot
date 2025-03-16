import { RefObject } from "react";

interface Message {
  content: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto mb-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${msg.isUser ? "user-message" : "ai-message"}`}
        >
          {msg.content}
        </div>
      ))}
      {isLoading && (
        <div className="message-bubble ai-message">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
