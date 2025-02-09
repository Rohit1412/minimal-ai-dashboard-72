import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import VideoInput from "@/components/video/VideoInput";
import FeatureSelection from "@/components/video/FeatureSelection";
import AnalysisResults from "@/components/video/AnalysisResults";

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
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    labels: true,
    objects: false,
    texts: false,
    explicit: false,
    faces: false
  });
  const { toast } = useToast();

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
    setSelectedFeatures({
      labels: true,
      objects: true,
      texts: true,
      explicit: true,
      faces: true
    });
    handleAnalyze();
  };

  const handleAnalyze = async () => {
    if (!videoUrl && !videoFile) {
      toast({
        title: "Error",
        description: "Please provide a video URL or upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // API integration will be added here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    
    // Simulated results based on selected features
    const results: AnalysisResults = {};
    if (selectedFeatures.labels) results.labels = ["person", "indoor", "speaking"];
    if (selectedFeatures.objects) results.objects = ["desk", "computer", "chair"];
    if (selectedFeatures.texts) results.texts = ["Hello", "World"];
    if (selectedFeatures.explicit) results.explicit = "UNLIKELY";
    if (selectedFeatures.faces) results.faces = ["joy: 0.8", "surprise: 0.2"];

    setAnalysisResults(results);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Your video has been analyzed successfully!",
    });
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
      <main className="min-h-screen w-[80vw] ml-auto mr-[10vw] px-8 pt-5 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <Video className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Video Analysis</h1>
          </div>

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
              />

              <FeatureSelection
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
              />

              {videoUrl && (
                <div className="aspect-video w-full bg-black/10 rounded-lg overflow-hidden">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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

export default VideoAnalysis;
