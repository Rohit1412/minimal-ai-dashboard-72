
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

  const updateApiKey = async (newKey: string) => {
    try {
      // Validate the API key before saving
      const isValid = await validateApiKey(newKey);
      if (isValid) {
        localStorage.setItem('google_api_key', newKey);
        setApiKey(newKey);
        toast.success('Google API key updated and validated successfully');
      } else {
        toast.error('Invalid Google API key. Please check and try again.');
      }
    } catch (error) {
      console.error('Error updating API key:', error);
      toast.error('Failed to validate API key. Please try again.');
    }
  };

  const validateApiKey = async (key: string): Promise<boolean> => {
    if (!key) return false;

    try {
      const response = await fetch(
        `https://speech.googleapis.com/v1/operations?key=${key}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
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
    validateApiKey,
  };
};
