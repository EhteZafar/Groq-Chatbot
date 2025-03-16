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
      className="flex gap-2 sticky bottom-0 bg-background p-2 border-t"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-full border p-2 px-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-full bg-foreground text-background px-6 py-2 font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
