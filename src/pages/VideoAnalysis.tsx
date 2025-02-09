
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Video, Upload, Play, FileDown, ChartBar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VideoAnalysis = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<null | any>(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    labels: true,
    objects: false,
    texts: false,
    explicit: false,
    speeches: false,
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
    const results: any = {};
    if (selectedFeatures.labels) results.labels = ["person", "indoor", "speaking"];
    if (selectedFeatures.objects) results.objects = ["desk", "computer", "chair"];
    if (selectedFeatures.texts) results.texts = ["Hello", "World"];
    if (selectedFeatures.explicit) results.explicit = "UNLIKELY";
    if (selectedFeatures.speeches) results.speeches = ["transcribed text example"];
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
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </Button>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!videoUrl && !videoFile)}
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

              <div className="grid grid-cols-3 gap-4">
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
                    className="capitalize"
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
                      className="gap-2"
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
                            <p>{results}</p>
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

