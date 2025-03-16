interface MessageFormProps {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const MessageForm: React.FC<MessageFormProps> = ({ message, setMessage, handleSubmit, isLoading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-2 border-t"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-full border p-2 px-4 bg-gray-100 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-full bg-blue-500 text-white px-6 py-2 font-medium hover:bg-blue-600 disabled:opacity-50 transition-opacity"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
