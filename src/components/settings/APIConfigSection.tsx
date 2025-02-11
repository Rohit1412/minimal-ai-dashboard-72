
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGoogleApi } from "@/hooks/use-google-api";

interface APIConfigSectionProps {
  apiCallLimit: string;
  dataRetention: string;
  onApiCallLimitChange: (value: string) => void;
  onDataRetentionChange: (value: string) => void;
}

export const APIConfigSection = ({
  apiCallLimit,
  dataRetention,
  onApiCallLimitChange,
  onDataRetentionChange,
}: APIConfigSectionProps) => {
  const { apiKey, updateApiKey, validateApiKey } = useGoogleApi();
  const [newApiKey, setNewApiKey] = useState(apiKey);
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveApiKey = async () => {
    setIsValidating(true);
    try {
      const isValid = await validateApiKey();
      if (isValid) {
        updateApiKey(newApiKey);
      } else {
        toast.error("Invalid Google API key. Please check and try again.");
      }
    } catch (error) {
      toast.error("Error validating API key. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium dark:text-white">API Configuration</h3>
      <div className="space-y-2">
        <Label htmlFor="googleApiKey" className="dark:text-gray-200">Google API Key</Label>
        <div className="flex gap-2">
          <Input
            id="googleApiKey"
            type="password"
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
            placeholder="Enter your Google API Key"
            className="flex-1 dark:text-white dark:bg-[#2A2F3C] dark:border-white/10"
          />
          <Button 
            onClick={handleSaveApiKey}
            disabled={isValidating || !newApiKey}
          >
            {isValidating ? "Validating..." : "Save Key"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
          Visit the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline dark:text-blue-400">Google Cloud Console</a> to get your API key.
          Enable the following APIs:
          <ul className="list-disc list-inside mt-1 ml-2">
            <li>Cloud Speech-to-Text API</li>
            <li>Cloud Natural Language API</li>
            <li>Cloud Vision API</li>
          </ul>
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
