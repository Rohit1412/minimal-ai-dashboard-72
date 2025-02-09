
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  textFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnalyze: () => void;
  runAllAnalysis: () => void;
  isAnalyzing: boolean;
  isRunningAll: boolean;
}

const TextInput = ({
  text,
  setText,
  textFile,
  handleFileChange,
  handleAnalyze,
  runAllAnalysis,
  isAnalyzing,
  isRunningAll,
}: TextInputProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
      <Textarea
        placeholder="Enter text to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 min-h-[100px] dark:bg-[#2A2F3C] dark:text-white dark:border-white/10"
        disabled={isRunningAll}
      />
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
        <div className="relative">
          <Input
            type="file"
            accept=".txt,.doc,.docx"
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
            Upload Text
          </Button>
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || (!text && !textFile) || isRunningAll}
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
          disabled={isAnalyzing || (!text && !textFile)}
          className="gap-2 dark:bg-[#4A5568] dark:hover:bg-[#4A5568]/90 dark:text-white"
        >
          Run All Analysis
        </Button>
      </div>
    </div>
  );
};

export default TextInput;
