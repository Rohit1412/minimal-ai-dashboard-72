
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isBot ? "bg-secondary/50" : "bg-background"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center",
        isBot ? "bg-primary text-white" : "bg-muted"
      )}>
        {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-foreground">{message.content}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
