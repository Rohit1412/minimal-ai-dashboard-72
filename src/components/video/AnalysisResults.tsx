
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, ChartBar } from "lucide-react";

interface AnalysisResultsProps {
  results: {
    labels?: string[];
    objects?: string[];
    texts?: string[];
    explicit?: string;
    faces?: string[];
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
        {Object.entries(results).map(([feature, results]) => (
          <div key={feature} className="mb-4">
            <h3 className="text-lg font-semibold capitalize mb-2 dark:text-white">{feature}</h3>
            <div className="pl-4">
              {Array.isArray(results) ? (
                <ul className="list-disc pl-4 dark:text-gray-300">
                  {results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              ) : (
                <p className="dark:text-gray-300">{String(results)}</p>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default AnalysisResults;
