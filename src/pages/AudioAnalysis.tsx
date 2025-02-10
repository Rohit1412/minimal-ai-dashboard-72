
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
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
  const [audioUrl, setAudioUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    transcription: true,
    speakerDiarization: false,
    wordTimestamps: false,
    languageDetection: false
  });
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setAudioUrl(URL.createObjectURL(file));
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid audio file",
          variant: "destructive",
        });
      }
    }
  };

  const runAllAnalysis = () => {
    setIsRunningAll(true);
    setSelectedFeatures({
      transcription: true,
      speakerDiarization: true,
      wordTimestamps: true,
      languageDetection: true
    });
    handleAnalyze();
  };

  const handleAnalyze = async () => {
    if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your Google API key in settings first.",
        variant: "destructive",
      });
      navigate('/settings');
      return;
    }

    if (!audioUrl && !audioFile) {
      toast({
        title: "Error",
        description: "Please provide an audio URL or upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const file = audioFile;
      if (!file) {
        throw new Error("No audio file provided");
      }

      // Convert audio file to base64
      const base64Audio = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

      // Prepare the request to Google Cloud Speech-to-Text API
      const requestData = {
        audio: {
          content: base64Audio.split(',')[1]
        },
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
          enableWordTimeOffsets: selectedFeatures.wordTimestamps,
          enableSpeakerDiarization: selectedFeatures.speakerDiarization,
          enableAutomaticPunctuation: true,
        }
      };

      // Make the API call
      const response = await fetch('https://speech.googleapis.com/v1/speech:recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Process the results
      const results: AnalysisResults = {};
      if (data.results) {
        results.transcript = data.results[0]?.alternatives[0]?.transcript;
        results.confidence = data.results[0]?.alternatives[0]?.confidence;
        
        if (selectedFeatures.wordTimestamps) {
          results.wordTimestamps = data.results[0]?.alternatives[0]?.words?.map((word: any) => ({
            word: word.word,
            startTime: word.startTime,
            endTime: word.endTime
          }));
        }

        if (selectedFeatures.speakerDiarization && data.results[0]?.alternatives[0]?.speakerTags) {
          results.speakerDiarization = data.results[0].alternatives[0].speakerTags;
        }

        if (selectedFeatures.languageDetection) {
          results.languageDetection = data.results[0]?.languageCode;
        }
      }

      setAnalysisResults(results);
      toast({
        title: "Analysis Complete",
        description: "Your audio has been analyzed successfully!",
      });
    } catch (error) {
      console.error('Audio analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An error occurred during analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setIsRunningAll(false);
    }
  };

  const handleDownload = () => {
    if (!analysisResults) {
      toast({
        title: "Error",
        description: "No analysis results to download",
        variant: "destructive",
      });
      return;
    }
    // PDF generation logic will be added here
    toast({
      title: "Download Started",
      description: "Your results are being downloaded",
    });
  };

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

              {audioUrl && (
                <div className="w-full bg-black/10 rounded-lg overflow-hidden flex justify-center items-center p-4">
                  <audio controls src={audioUrl} className="w-full" />
                </div>
              )}

              {analysisResults && (
                <AnalysisResults
                  results={analysisResults}
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

