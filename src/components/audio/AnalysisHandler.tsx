
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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

  const convertAudioToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64Audio = reader.result.split(',')[1];
          resolve(base64Audio);
        }
      };
      reader.onerror = error => reject(error);
    });
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
      let audioContent = "";
      if (audioFile) {
        audioContent = await convertAudioToBase64(audioFile);
      }

      const config = {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "en-US",
        enableWordTimeOffsets: selectedFeatures.wordTimestamps,
        enableSpeakerDiarization: selectedFeatures.speakerDiarization,
        enableAutomaticPunctuation: true,
        model: "latest_long",
        useEnhanced: true,
      };

      const requestBody = {
        audio: { content: audioContent },
        config: config,
      };

      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const results: AnalysisResults = {};

      if (data.results && data.results[0]) {
        if (selectedFeatures.transcription) {
          const alternative = data.results[0].alternatives[0];
          results.transcript = alternative.transcript;
          results.confidence = alternative.confidence;
        }

        if (selectedFeatures.wordTimestamps && data.results[0].alternatives[0].words) {
          results.wordTimestamps = data.results[0].alternatives[0].words.map((word: any) => ({
            word: word.word,
            startTime: word.startTime,
            endTime: word.endTime,
          }));
        }

        if (selectedFeatures.speakerDiarization && data.results[0].alternatives[0].words) {
          const speakerLabels = data.results[0].alternatives[0].words
            .filter((word: any) => word.speakerTag)
            .map((word: any) => `Speaker ${word.speakerTag}: ${word.word}`);
          results.speakerDiarization = speakerLabels;
        }

        if (selectedFeatures.languageDetection) {
          results.languageDetection = data.results[0].languageCode || "en-US";
        }
      }

      onResultsUpdate(results);
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
