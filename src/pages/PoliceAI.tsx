
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import AnalysisStatus from "@/components/common/AnalysisStatus";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

const systemPrompt = `You are an AI assistant specifically designed to help Indian police officers. Your role includes:

1. Assisting with case documentation and report writing
2. Providing relevant sections of Indian Penal Code (IPC) and Criminal Procedure Code (CrPC)
3. Suggesting investigation procedures and best practices
4. Helping with evidence analysis and documentation
5. Offering guidance on legal procedures and protocols
6. Assisting with FIR drafting and documentation
7. Providing updates on recent legal amendments and supreme court judgments

Always maintain professionalism and follow legal guidelines. Do not provide legal advice, only information and procedural guidance.`;

const PoliceAI = () => {
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
      const response = await fetch('https://api.nbox.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NBOX_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama2-chat-13b-4k',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      const data = await response.json();
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    toast({
      title: "Document Upload",
      description: `Processing ${file.name}...`,
    });
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded document: ${file.name}`,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className={`min-h-screen ${isMobile ? 'w-[92%] mx-auto' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-[calc(80px+5vh)] pb-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnalysisStatus 
            title="Police AI Assistant"
            description="Your intelligent partner for law enforcement assistance"
            icon={Shield}
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

export default PoliceAI;
