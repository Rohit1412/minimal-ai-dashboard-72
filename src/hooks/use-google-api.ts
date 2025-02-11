
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useGoogleApi = () => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const updateApiKey = (newKey: string) => {
    localStorage.setItem('google_api_key', newKey);
    setApiKey(newKey);
    toast.success('Google API key updated successfully');
  };

  const validateApiKey = async (): Promise<boolean> => {
    if (!apiKey) return false;

    try {
      const response = await fetch(
        `https://speech.googleapis.com/v1/operations?key=${apiKey}`,
        { method: 'GET' }
      );
      return response.ok;
    } catch (error) {
      console.error('Error validating Google API key:', error);
      return false;
    }
  };

  return {
    apiKey,
    isConfigured: !!apiKey,
    updateApiKey,
    validateApiKey
  };
};
