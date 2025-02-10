
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AudioLines } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGoogleApi } from "@/hooks/use-google-api";
import { useNavigate } from "react-router-dom";
import AudioInput from "@/components/audio/AudioInput";
import FeatureSelection from "@/components/audio/FeatureSelection";
import AnalysisResults from "@/components/audio/AnalysisResults";

interface AnalysisResults {
  transcript?: string;
  confidence?: number;
  wordTimestamps?: { word: string; startTime: string; endTime: string }[];
  speakerDiarization?: string[];
  languageDetection?: string;
}

const AudioAnalysis = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();

  const [audioUrl, setAudioUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [results, setResults] = useState<AnalysisResults>({});
  const [selectedFeatures, setSelectedFeatures] = useState({
    transcription: true,
    speakerDiarization: false,
    wordTimestamps: false,
    languageDetection: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioUrl("");
    }
  };

  const handleAnalyze = async () => {
    if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your Google Cloud API key in settings first.",
        variant: "destructive",
      });
      navigate("/settings");
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      if (audioFile) {
        formData.append("audio", audioFile);
      } else if (audioUrl) {
        formData.append("audioUrl", audioUrl);
      }

      // TODO: Replace with actual API call
      // Simulated API response for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResults({
        transcript: "This is a sample transcript.",
        confidence: 0.95,
        wordTimestamps: [
          { word: "This", startTime: "0.0s", endTime: "0.2s" },
          { word: "is", startTime: "0.2s", endTime: "0.4s" },
        ],
        speakerDiarization: ["Speaker 1: Hello", "Speaker 2: Hi"],
        languageDetection: "English",
      });

      toast({
        title: "Analysis Complete",
        description: "Audio analysis completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const runAllAnalysis = async () => {
    setIsRunningAll(true);
    setSelectedFeatures({
      transcription: true,
      speakerDiarization: true,
      wordTimestamps: true,
      languageDetection: true,
    });
    await handleAnalyze();
    setIsRunningAll(false);
  };

  const handleDownload = () => {
    const resultsString = JSON.stringify(results, null, 2);
    const blob = new Blob([resultsString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audio-analysis-results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-20 pb-8`}>
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
            <div className="space-y-6">
              <AudioInput
                audioUrl={audioUrl}
                setAudioUrl={setAudioUrl}
                handleFileChange={handleFileChange}
                handleAnalyze={handleAnalyze}
                runAllAnalysis={runAllAnalysis}
                isAnalyzing={isAnalyzing}
                audioFile={audioFile}
                isRunningAll={isRunningAll}
              />

              <FeatureSelection
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                isRunningAll={isRunningAll}
              />

              {Object.keys(results).length > 0 && (
                <AnalysisResults
                  results={results}
                  onDownload={handleDownload}
                />
              )}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AudioAnalysis;
