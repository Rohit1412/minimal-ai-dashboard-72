
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import VideoInput from "@/components/video/VideoInput";
import FeatureSelection from "@/components/video/FeatureSelection";
import AnalysisResults from "@/components/video/AnalysisResults";
import VideoPreview from "@/components/video/VideoPreview";
import { useVideoAnalysis } from "@/components/video/VideoAnalysisHandler";
import { useIsMobile } from "@/hooks/use-mobile";
import AnalysisStatus from "@/components/common/AnalysisStatus";

interface AnalysisResults {
  labels?: string[];
  objects?: string[];
  texts?: string[];
  explicit?: string;
  faces?: string[];
}

const VideoAnalysis = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    labels: true,
    objects: false,
    texts: false,
    explicit: false,
    faces: false
  });
  
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { handleAnalyze } = useVideoAnalysis({
    videoUrl,
    videoFile,
    setAnalysisResults,
    selectedFeatures,
    setIsAnalyzing,
    setIsRunningAll,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid video file",
          variant: "destructive",
        });
      }
    }
  };

  const runAllAnalysis = () => {
    setIsRunningAll(true);
    setSelectedFeatures({
      labels: true,
      objects: true,
      texts: true,
      explicit: true,
      faces: true
    });
    handleAnalyze();
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
          <AnalysisStatus 
            title="Video Analysis"
            description="Analyze your videos for content, objects, and more"
            icon={Video}
          />

          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg dark:bg-[#1A1F2C] dark:border-white/10">
            <div className="space-y-4">
              <VideoInput
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                handleFileChange={handleFileChange}
                handleAnalyze={handleAnalyze}
                runAllAnalysis={runAllAnalysis}
                isAnalyzing={isAnalyzing}
                videoFile={videoFile}
                isRunningAll={isRunningAll}
              />

              <FeatureSelection
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                isRunningAll={isRunningAll}
              />

              <VideoPreview videoUrl={videoUrl} />

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

export default VideoAnalysis;
