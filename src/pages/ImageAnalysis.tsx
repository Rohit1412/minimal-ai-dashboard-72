import { useState } from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ImageInput from "@/components/image/ImageInput";
import FeatureSelection from "@/components/image/FeatureSelection";
import AnalysisResults from "@/components/image/AnalysisResults";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGoogleApi } from "@/hooks/use-google-api";
import { useNavigate } from "react-router-dom";

interface AnalysisResults {
  labels?: string[];
  objects?: string[];
  texts?: string[];
  explicit?: string;
  faces?: string[];
  landmarks?: string[];
}

const ImageAnalysis = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState({
    labels: true,
    objects: false,
    texts: false,
    explicit: false,
    faces: false,
    landmarks: false
  });
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { apiKey, isConfigured } = useGoogleApi();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid image file",
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
      faces: true,
      landmarks: true
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

    if (!imageUrl && !imageFile) {
      toast({
        title: "Error",
        description: "Please provide an image URL or upload a file",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      let imageContent = "";
      if (imageFile) {
        const reader = new FileReader();
        imageContent = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(imageFile);
        });
      }

      const requestBody = {
        requests: [{
          image: {
            content: imageContent.split(',')[1]
          },
          features: [
            { type: 'LABEL_DETECTION' },
            { type: 'OBJECT_LOCALIZATION' },
            { type: 'TEXT_DETECTION' },
            { type: 'SAFE_SEARCH_DETECTION' },
            { type: 'FACE_DETECTION' },
            { type: 'LANDMARK_DETECTION' }
          ]
        }]
      };

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const data = await response.json();
      const results: AnalysisResults = {};
      
      if (selectedFeatures.labels) {
        results.labels = data.responses[0].labelAnnotations?.map((label: any) => 
          `${label.description} (${Math.round(label.score * 100)}%)`
        ) || [];
      }
      if (selectedFeatures.objects) {
        results.objects = data.responses[0].localizedObjectAnnotations?.map((obj: any) => 
          `${obj.name} (${Math.round(obj.score * 100)}%)`
        ) || [];
      }
      if (selectedFeatures.texts) {
        results.texts = data.responses[0].textAnnotations?.map((text: any) => text.description) || [];
      }
      if (selectedFeatures.explicit) {
        const safeSearch = data.responses[0].safeSearchAnnotation;
        results.explicit = `Adult: ${safeSearch?.adult}, Violence: ${safeSearch?.violence}`;
      }
      if (selectedFeatures.faces) {
        results.faces = data.responses[0].faceAnnotations?.map((face: any) => 
          `Joy: ${face.joyLikelihood}, Confidence: ${Math.round(face.detectionConfidence * 100)}%`
        ) || [];
      }
      if (selectedFeatures.landmarks) {
        results.landmarks = data.responses[0].landmarkAnnotations?.map((landmark: any) => 
          `${landmark.description} (${Math.round(landmark.score * 100)}%)`
        ) || [];
      }

      setAnalysisResults(results);
      toast({
        title: "Analysis Complete",
        description: "Your image has been analyzed successfully!",
      });
    } catch (error) {
      console.error('Image analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze image. Please try again.",
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
            <ImageIcon className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-primary dark:text-white">Image Analysis</h1>
          </div>

          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg dark:bg-[#1A1F2C] dark:border-white/10">
            <div className="space-y-4">
              <ImageInput
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                handleFileChange={handleFileChange}
                handleAnalyze={handleAnalyze}
                runAllAnalysis={runAllAnalysis}
                isAnalyzing={isAnalyzing}
                imageFile={imageFile}
                isRunningAll={isRunningAll}
              />

              <FeatureSelection
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                isRunningAll={isRunningAll}
              />

              {imageUrl && (
                <div className="w-full bg-black/10 rounded-lg overflow-hidden flex justify-center items-center" style={{ height: '40vh' }}>
                  <img
                    src={imageUrl}
                    alt="Uploaded image"
                    className="max-h-full max-w-full object-contain"
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

export default ImageAnalysis;
