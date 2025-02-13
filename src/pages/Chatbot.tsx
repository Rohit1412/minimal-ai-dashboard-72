
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import AnalysisStatus from "@/components/common/AnalysisStatus";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Here you would typically make an API call to your AI service
      // For now, we'll simulate a response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm a demo response. In the real implementation, this would be connected to an AI service.",
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    toast({
      title: "File uploaded",
      description: `Processing ${file.name}...`,
    });
    
    // Here you would typically process the file and send it to your AI service
    // For now, we'll just acknowledge the upload
    const newMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded file: ${file.name}`,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-[calc(80px+5vh)] pb-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnalysisStatus 
            title="AI Chatbot"
            description="Chat with AI and upload documents for analysis"
            icon={MessageSquare}
          />
          
          <Card className="max-w-4xl mx-auto p-6 dark:bg-[#1A1F2C] dark:border-white/10">
            <div className="flex flex-col h-[60vh]">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 pt-4 border-t dark:border-white/10">
                <ChatInput
                  onSend={handleSendMessage}
                  onFileUpload={handleFileUpload}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Chatbot;
