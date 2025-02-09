
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoInputProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnalyze: () => void;
  runAllAnalysis: () => void;
  isAnalyzing: boolean;
  videoFile: File | null;
  isRunningAll: boolean;
}

const VideoInput = ({
  videoUrl,
  setVideoUrl,
  handleFileChange,
  handleAnalyze,
  runAllAnalysis,
  isAnalyzing,
  videoFile,
  isRunningAll,
}: VideoInputProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
      <Input
        type="url"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="flex-1 dark:bg-[#2A2F3C] dark:text-white dark:border-white/10"
        disabled={isRunningAll}
      />
      <div className="relative">
        <Input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isRunningAll}
        />
        <Button 
          variant="outline" 
          className="w-full gap-2 dark:bg-[#2A2F3C] dark:hover:bg-[#3A3F4C] dark:text-white"
          disabled={isRunningAll}
        >
          <Upload className="w-4 h-4" />
          Upload Video
        </Button>
      </div>
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || (!videoUrl && !videoFile) || isRunningAll}
        className="gap-2 dark:bg-primary dark:hover:bg-primary/90 dark:text-white"
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
        className="gap-2 dark:bg-[#4A5568] dark:hover:bg-[#4A5568]/90 dark:text-white"
      >
        Run All Analysis
      </Button>
    </div>
  );
};

export default VideoInput;
