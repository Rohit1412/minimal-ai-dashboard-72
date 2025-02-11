
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import AudioInput from "@/components/audio/AudioInput";
import FeatureSelection from "@/components/audio/FeatureSelection";
import AnalysisResults from "@/components/audio/AnalysisResults";
import AnalysisStatus from "@/components/audio/AnalysisStatus";
import AnalysisHandler from "@/components/audio/AnalysisHandler";

interface AnalysisResults {
  transcript?: string;
  confidence?: number;
  wordTimestamps?: { word: string; startTime: string; endTime: string }[];
  speakerDiarization?: string[];
  languageDetection?: string;
}

const AudioAnalysis = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const loadFont = async () => {
      const font = new FontFace(
        'Archivo',
        'url(https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&display=swap)'
      );
      try {
        await font.load();
        document.fonts.add(font);
        console.log('Archivo font loaded successfully');
      } catch (error) {
        console.error('Error loading Archivo font:', error);
      }
    };
    loadFont();
  }, []);

  const [audioUrl, setAudioUrl] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [results, setResults] = useState<AnalysisResults>({});
  const [selectedFeatures, setSelectedFeatures] = useState({
    transcription: true,
    speakerDiarization: false,
    wordTimestamps: false,
    languageDetection: false,
  });

  const { handleAnalyze, runAllAnalysis, isAnalyzing, isRunningAll } = AnalysisHandler({
    audioFile,
    audioUrl,
    selectedFeatures,
    onResultsUpdate: setResults,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioUrl("");
    }
  };

  const handleDownload = () => {
    if (!Object.keys(results).length) {
      toast({
        title: "No Results",
        description: "There are no results to download.",
        variant: "destructive",
      });
      return;
    }

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
    <div className="min-h-screen bg-background font-archivo">
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-20 pb-8`}>
        <AnalysisStatus title="Audio Analysis" />

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
      </main>
    </div>
  );
};

export default AudioAnalysis;

