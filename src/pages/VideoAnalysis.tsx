import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import VideoInput from "@/components/video/VideoInput";
import FeatureSelection from "@/components/video/FeatureSelection";
import AnalysisResults from "@/components/video/AnalysisResults";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGoogleApi } from "@/hooks/use-google-api";
import { useNavigate } from "react-router-dom";

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
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();

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

  const handleAnalyze = async () => {
    if (!isConfigured) {
      toast({
        title: "API Key Required",
        description: "Please configure your Google Cloud API key in settings first.",
        variant: "destructive",
      });
      navigate('/settings');
      return;
    }

    if (!videoUrl && !videoFile) {
      toast({
        title: "Error",
        description: "Please provide a video URL or upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      let videoContent = "";
      if (videoFile) {
        const reader = new FileReader();
        videoContent = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(videoFile);
        });
      }

      const requestBody = {
        video: {
          content: videoContent.split(',')[1]
        },
        features: [
          { type: 'LABEL_DETECTION' },
          { type: 'OBJECT_TRACKING' },
          { type: 'TEXT_DETECTION' },
          { type: 'EXPLICIT_CONTENT_DETECTION' },
          { type: 'FACE_DETECTION' }
        ]
      };

      const response = await fetch(
        `https://videointelligence.googleapis.com/v1/videos:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze video');
      }

      const data = await response.json();
      
      const results: AnalysisResults = {};
      if (selectedFeatures.labels) results.labels = data.labelAnnotations?.map((label: any) => label.description) || [];
      if (selectedFeatures.objects) results.objects = data.objectAnnotations?.map((obj: any) => obj.name) || [];
      if (selectedFeatures.texts) results.texts = data.textAnnotations?.map((text: any) => text.text) || [];
      if (selectedFeatures.explicit) results.explicit = data.explicitAnnotation?.frames[0]?.pornographyLikelihood || 'UNKNOWN';
      if (selectedFeatures.faces) results.faces = data.faceAnnotations?.map((face: any) => `Confidence: ${face.detectionConfidence}`) || [];

      setAnalysisResults(results);
      toast({
        title: "Analysis Complete",
        description: "Your video has been analyzed successfully!",
      });
    } catch (error) {
      console.error('Video analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze video. Please try again.",
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
            <Video className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-primary dark:text-white">Video Analysis</h1>
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
                isRunningAll={isRunningAll}
              />

              <FeatureSelection
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                isRunningAll={isRunningAll}
              />

              {videoUrl && (
                <div className="aspect-video w-full bg-black/10 rounded-lg overflow-hidden" style={{ height: '40vh' }}>
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
