
import { Label } from "@/components/ui/label";

interface AppearanceSectionProps {
  theme: string;
  fontSize: string;
  onThemeChange: (value: string) => void;
  onFontSizeChange: (value: string) => void;
}

export const AppearanceSection = ({
  theme,
  fontSize,
  onThemeChange,
  onFontSizeChange,
}: AppearanceSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">Appearance</h3>
      
      <div>
        <Label htmlFor="theme" className="dark:text-gray-200">Theme</Label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <Label htmlFor="fontSize" className="dark:text-gray-200">Font Size</Label>
        <select
          id="fontSize"
          value={fontSize}
          onChange={(e) => onFontSizeChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  );
};
