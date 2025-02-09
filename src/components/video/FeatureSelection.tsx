
import { Button } from "@/components/ui/button";

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
}

const FeatureSelection = ({
  selectedFeatures,
  setSelectedFeatures,
}: FeatureSelectionProps) => {
  return (
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
  );
};

export default FeatureSelection;
