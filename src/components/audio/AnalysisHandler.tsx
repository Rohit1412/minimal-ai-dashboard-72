
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleApi } from "@/hooks/use-google-api";

interface AnalysisResults {
  transcript?: string;
  confidence?: number;
  wordTimestamps?: { word: string; startTime: string; endTime: string }[];
  speakerDiarization?: string[];
  languageDetection?: string;
}

interface AnalysisHandlerProps {
  audioFile: File | null;
  audioUrl: string;
  selectedFeatures: {
    transcription: boolean;
    speakerDiarization: boolean;
    wordTimestamps: boolean;
    languageDetection: boolean;
  };
  onResultsUpdate: (results: AnalysisResults) => void;
}

const AnalysisHandler = ({ 
  audioFile, 
  audioUrl, 
  selectedFeatures, 
  onResultsUpdate 
}: AnalysisHandlerProps) => {
  const { toast } = useToast();
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);

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

    if (!audioFile && !audioUrl) {
      toast({
        title: "Input Required",
        description: "Please provide an audio file or URL to analyze.",
        variant: "destructive",
      });
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

      formData.append("features", JSON.stringify(selectedFeatures));
      formData.append("apiKey", apiKey);

      const response = await fetch("https://api.yourdomain.com/analyze-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze audio");
      }

      const data = await response.json();
      onResultsUpdate(data);

      toast({
        title: "Analysis Complete",
        description: "Audio analysis completed successfully.",
      });
    } catch (error) {
      console.error("Analysis error:", error);
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
    const allFeatures = {
      transcription: true,
      speakerDiarization: true,
      wordTimestamps: true,
      languageDetection: true,
    };
    await handleAnalyze();
    setIsRunningAll(false);
  };

  return { handleAnalyze, runAllAnalysis, isAnalyzing, isRunningAll };
};

export default AnalysisHandler;
