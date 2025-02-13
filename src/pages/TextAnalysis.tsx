
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TextInput from "@/components/text/TextInput";
import FeatureSelection from "@/components/text/FeatureSelection";
import AnalysisResults from "@/components/text/AnalysisResults";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGoogleApi } from "@/hooks/use-google-api";
import { useNavigate } from "react-router-dom";
import AnalysisStatus from "@/components/common/AnalysisStatus";

interface AnalysisResults {
  entities?: string[];
  sentiment?: string;
  syntax?: string[];
  categories?: string[];
  language?: string;
}

const TextAnalysis = () => {
  const [text, setText] = useState("");
  const [textFile, setTextFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    entities: true,
    sentiment: false,
    syntax: false,
    categories: false,
    language: false
  });
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();

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

    if (!text && !textFile) {
      toast({
        title: "Error",
        description: "Please provide text or upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const requestBody = {
        document: {
          type: 'PLAIN_TEXT',
          content: text
        },
        features: {
          extractSyntax: selectedFeatures.syntax,
          extractEntities: selectedFeatures.entities,
          extractDocumentSentiment: selectedFeatures.sentiment,
          classifyText: selectedFeatures.categories,
        },
      };

      const response = await fetch(
        `https://language.googleapis.com/v1/documents:annotateText?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      const results: AnalysisResults = {};

      if (selectedFeatures.entities) {
        results.entities = data.entities?.map((entity: any) => 
          `${entity.name} (${entity.type}, ${Math.round(entity.salience * 100)}% relevance)`
        ) || [];
      }
      if (selectedFeatures.sentiment) {
        const sentiment = data.documentSentiment;
        results.sentiment = `Score: ${sentiment.score} (${sentiment.score > 0 ? 'Positive' : sentiment.score < 0 ? 'Negative' : 'Neutral'}), Magnitude: ${sentiment.magnitude}`;
      }
      if (selectedFeatures.syntax) {
        results.syntax = data.tokens?.map((token: any) => 
          `${token.text.content} (${token.partOfSpeech.tag})`
        ) || [];
      }
      if (selectedFeatures.categories) {
        results.categories = data.categories?.map((category: any) => 
          `${category.name} (${Math.round(category.confidence * 100)}%)`
        ) || [];
      }
      if (selectedFeatures.language) {
        results.language = data.language || 'Unknown';
      }

      setAnalysisResults(results);
      toast({
        title: "Analysis Complete",
        description: "Your text has been analyzed successfully!",
      });
    } catch (error) {
      console.error('Text analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
      setIsRunningAll(false);
    }
  };

  const runAllAnalysis = () => {
    setIsRunningAll(true);
    setSelectedFeatures({
      entities: true,
      sentiment: true,
      syntax: true,
      categories: true,
      language: true
    });
    handleAnalyze();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/plain' || file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setTextFile(file);
        const content = await file.text();
        setText(content);
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid text file (.txt, .doc, .docx)",
          variant: "destructive",
        });
      }
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
          <AnalysisStatus 
            title="Text Analysis"
            description="Analyze your text for entities, sentiment, syntax, and more"
            icon={FileText}
          />

          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg dark:bg-[#1A1F2C] dark:border-white/10">
            <div className="space-y-4">
              <TextInput
                text={text}
                setText={setText}
                handleFileChange={handleFileChange}
                handleAnalyze={handleAnalyze}
                runAllAnalysis={runAllAnalysis}
                isAnalyzing={isAnalyzing}
                textFile={textFile}
                isRunningAll={isRunningAll}
              />

              <FeatureSelection
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                isRunningAll={isRunningAll}
              />

              {text && (
                <div className="w-full bg-black/10 rounded-lg overflow-hidden p-4" style={{ maxHeight: '40vh' }}>
                  <pre className="whitespace-pre-wrap break-words dark:text-white">
                    {text}
                  </pre>
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

export default TextAnalysis;
