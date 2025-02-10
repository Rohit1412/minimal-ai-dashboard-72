
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PreferencesSectionProps {
  autoSave: boolean;
  language: string;
  onAutoSaveChange: (value: boolean) => void;
  onLanguageChange: (value: string) => void;
}

export const PreferencesSection = ({
  autoSave,
  language,
  onAutoSaveChange,
  onLanguageChange,
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

      <div>
        <Label htmlFor="language" className="dark:text-gray-200">Language</Label>
        <select
          id="language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="chinese">Chinese</option>
          <option value="japanese">Japanese</option>
        </select>
      </div>
    </div>
  );
};
