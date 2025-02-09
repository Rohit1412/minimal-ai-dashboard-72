
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Video, Upload, Play, FileDown, ChartBar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
              <div className="flex gap-4">
                <Input
                  type="url"
                  placeholder="Enter video URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1"
                />
                <div className="relative">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="gap-2 dark:bg-[#2A2F3C] dark:hover:bg-[#3A3F4C]">
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </Button>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!videoUrl && !videoFile)}
                  className="gap-2 dark:bg-primary dark:hover:bg-primary/90"
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
                <Button
                  onClick={runAllAnalysis}
                  disabled={isAnalyzing || (!videoUrl && !videoFile)}
                  className="gap-2 dark:bg-[#4A5568] dark:hover:bg-[#4A5568]/90"
                >
                  Run All Analysis
                </Button>
              </div>

              <div className="flex gap-4 flex-wrap">
                {Object.entries(selectedFeatures).map(([feature, isSelected]) => (
                  <Button
                    key={feature}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() =>
                      setSelectedFeatures(prev => ({
                        ...prev,
                        [feature]: !prev[feature as keyof typeof selectedFeatures]
                      }))
                    }
                    className={`capitalize dark:${isSelected ? 'bg-primary hover:bg-primary/90' : 'bg-[#2A2F3C] hover:bg-[#3A3F4C]'}`}
                  >
                    {feature}
                  </Button>
                ))}
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
                      className="gap-2 dark:bg-[#2A2F3C] dark:hover:bg-[#3A3F4C]"
                    >
                      <FileDown className="w-4 h-4" />
                      Download Results
                    </Button>
                  </div>
                  
                  <Card className="p-4 dark:bg-[#1A1F2C] dark:border-white/10">
                    {Object.entries(analysisResults).map(([feature, results]) => (
                      <div key={feature} className="mb-4">
                        <h3 className="text-lg font-semibold capitalize mb-2">{feature}</h3>
                        <div className="pl-4">
                          {Array.isArray(results) ? (
                            <ul className="list-disc pl-4">
                              {results.map((result, index) => (
                                <li key={index}>{result}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{String(results)}</p>
                          )}
                        </div>
                      </div>
                    ))}
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
