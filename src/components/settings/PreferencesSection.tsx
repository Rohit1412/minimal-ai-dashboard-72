
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PreferencesSectionProps {
  autoSave: boolean;
  onAutoSaveChange: (value: boolean) => void;
}

export const PreferencesSection = ({
  autoSave,
  onAutoSaveChange,
}: PreferencesSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">Preferences</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="autoSave" className="dark:text-gray-200">Auto-save</Label>
          <p className="text-sm text-muted-foreground dark:text-gray-400">Automatically save changes</p>
        </div>
        <Switch
          id="autoSave"
          checked={autoSave}
          onCheckedChange={onAutoSaveChange}
        />
      </div>
    </div>
  );
};
