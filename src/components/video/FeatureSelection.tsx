
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SelectedFeatures {
  labels: boolean;
  objects: boolean;
  texts: boolean;
  explicit: boolean;
  faces: boolean;
}

interface FeatureSelectionProps {
  selectedFeatures: SelectedFeatures;
  setSelectedFeatures: React.Dispatch<React.SetStateAction<SelectedFeatures>>;
  isRunningAll: boolean;
}

const FeatureSelection = ({
  selectedFeatures,
  setSelectedFeatures,
  isRunningAll,
}: FeatureSelectionProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex gap-2 ${isMobile ? 'flex-wrap justify-center' : 'flex-wrap'}`}>
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
          disabled={isRunningAll}
          className={`capitalize dark:text-white ${isMobile ? 'text-sm px-3' : ''} ${
            isSelected 
              ? 'dark:bg-primary dark:hover:bg-primary/90' 
              : 'dark:bg-[#2A2F3C] dark:hover:bg-[#3A3F4C]'
          }`}
        >
          {feature}
        </Button>
      ))}
    </div>
  );
};

export default FeatureSelection;
