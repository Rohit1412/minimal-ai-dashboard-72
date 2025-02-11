
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useGoogleApi } from "@/hooks/use-google-api";

interface AnalysisResults {
  labels?: string[];
  objects?: string[];
  texts?: string[];
  explicit?: string;
  faces?: string[];
}

interface VideoAnalysisHandlerProps {
  videoUrl: string;
  videoFile: File | null;
  setAnalysisResults: (results: AnalysisResults | null) => void;
  selectedFeatures: {
    labels: boolean;
    objects: boolean;
    texts: boolean;
    explicit: boolean;
    faces: boolean;
  };
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setIsRunningAll: (isRunningAll: boolean) => void;
}

export const useVideoAnalysis = ({
  videoUrl,
  videoFile,
  setAnalysisResults,
  selectedFeatures,
  setIsAnalyzing,
  setIsRunningAll,
}: VideoAnalysisHandlerProps) => {
  const { toast } = useToast();
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

  return { handleAnalyze };
};
