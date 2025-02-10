
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { AudioLines } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGoogleApi } from "@/hooks/use-google-api";
import { useNavigate } from "react-router-dom";

const AudioAnalysis = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-5 pb-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <AudioLines className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-primary dark:text-white">Audio Analysis</h1>
          </div>

          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg dark:bg-[#1A1F2C] dark:border-white/10">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Audio analysis feature is being implemented. Please check back soon.
              </p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AudioAnalysis;
