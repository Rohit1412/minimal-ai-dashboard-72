
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Video, Play, FileDown, ChartBar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VideoAnalysis = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!videoUrl) {
      toast({
        title: "Error",
        description: "Please enter a video URL first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // API integration will be added here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    
    // Simulated results
    setAnalysisResults({
      summary: "Sample video analysis results will appear here.",
      metrics: {
        duration: "3:45",
        engagement: "85%",
        quality: "HD",
      }
    });
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
              <div className="flex gap-4">
                <Input
                  type="url"
                  placeholder="Enter video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !videoUrl}
                  className="gap-2"
                >
                  {isAnalyzing ? (
                    "Analyzing..."
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <ChartBar className="w-5 h-5" />
                      Analysis Results
                    </h2>
                    <Button
                      variant="outline"
                      onClick={handleDownload}
                      className="gap-2"
                    >
                      <FileDown className="w-4 h-4" />
                      Download Results
                    </Button>
                  </div>
                  
                  <Card className="p-4 dark:bg-[#1A1F2C] dark:border-white/10">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="text-lg font-semibold">
                          {analysisResults.metrics.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-lg font-semibold">
                          {analysisResults.metrics.engagement}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quality</p>
                        <p className="text-lg font-semibold">
                          {analysisResults.metrics.quality}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Summary</p>
                      <p className="mt-1">{analysisResults.summary}</p>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default VideoAnalysis;

