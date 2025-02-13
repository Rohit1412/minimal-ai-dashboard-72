
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Upload } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSend, onFileUpload, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative">
        <Input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.txt"
        />
        <Button
          type="button"
          variant="outline"
          className="dark:bg-[#2A2F3C] dark:hover:bg-[#3A3F4C]"
        >
          <Upload className="w-4 h-4" />
        </Button>
      </div>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 dark:bg-[#2A2F3C]"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !message.trim()}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
