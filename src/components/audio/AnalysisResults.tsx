
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, ChartBar } from "lucide-react";

interface AnalysisResultsProps {
  results: {
    transcript?: string;
    confidence?: number;
    wordTimestamps?: { word: string; startTime: string; endTime: string }[];
    speakerDiarization?: string[];
    languageDetection?: string;
  };
  onDownload: () => void;
}

const AnalysisResults = ({ results, onDownload }: AnalysisResultsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
          <ChartBar className="w-5 h-5" />
          Analysis Results
        </h2>
        <Button
          variant="outline"
          onClick={onDownload}
          className="gap-2 dark:bg-[#2A2F3C] dark:hover:bg-[#3A3F4C] dark:text-white"
        >
          <FileDown className="w-4 h-4" />
          Download Results
        </Button>
      </div>
      
      <Card className="p-4 dark:bg-[#1A1F2C] dark:border-white/10">
        {results.transcript && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Transcript</h3>
            <p className="dark:text-gray-300">{results.transcript}</p>
            {results.confidence && (
              <p className="mt-2 text-sm dark:text-gray-400">
                Confidence: {(results.confidence * 100).toFixed(2)}%
              </p>
            )}
          </div>
        )}

        {results.wordTimestamps && results.wordTimestamps.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Word Timestamps</h3>
            <div className="max-h-40 overflow-y-auto">
              {results.wordTimestamps.map((item, index) => (
                <div key={index} className="text-sm dark:text-gray-300">
                  {item.word}: {item.startTime} - {item.endTime}
                </div>
              ))}
            </div>
          </div>
        )}

        {results.speakerDiarization && results.speakerDiarization.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Speaker Diarization</h3>
            <ul className="list-disc pl-4 dark:text-gray-300">
              {results.speakerDiarization.map((speaker, index) => (
                <li key={index}>{speaker}</li>
              ))}
            </ul>
          </div>
        )}

        {results.languageDetection && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Detected Language</h3>
            <p className="dark:text-gray-300">{results.languageDetection}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AnalysisResults;

