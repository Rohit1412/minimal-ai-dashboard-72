
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface APIConfigSectionProps {
  googleApiKey: string;
  apiCallLimit: string;
  dataRetention: string;
  onGoogleApiKeyChange: (value: string) => void;
  onApiCallLimitChange: (value: string) => void;
  onDataRetentionChange: (value: string) => void;
}

export const APIConfigSection = ({
  googleApiKey,
  apiCallLimit,
  dataRetention,
  onGoogleApiKeyChange,
  onApiCallLimitChange,
  onDataRetentionChange,
}: APIConfigSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">API Configuration</h3>
      <div>
        <Label htmlFor="googleApiKey" className="dark:text-gray-200">Google API Key</Label>
        <Input
          id="googleApiKey"
          type="password"
          value={googleApiKey}
          onChange={(e) => onGoogleApiKeyChange(e.target.value)}
          placeholder="Enter your Google API Key"
          className="mt-1 dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
        />
        <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
          Visit the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline dark:text-blue-400">Google Cloud Console</a> to get your API key.
        </p>
      </div>

      <div>
        <Label htmlFor="apiCallLimit" className="dark:text-gray-200">API Call Limit (per day)</Label>
        <Input
          id="apiCallLimit"
          type="number"
          value={apiCallLimit}
          onChange={(e) => onApiCallLimitChange(e.target.value)}
          placeholder="Enter API call limit"
          className="mt-1 dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
        />
      </div>

      <div>
        <Label htmlFor="dataRetention" className="dark:text-gray-200">Data Retention (days)</Label>
        <Input
          id="dataRetention"
          type="number"
          value={dataRetention}
          onChange={(e) => onDataRetentionChange(e.target.value)}
          placeholder="Enter data retention period in days"
          className="mt-1 dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
        />
      </div>
    </div>
  );
};
