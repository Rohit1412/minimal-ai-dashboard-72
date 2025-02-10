
import { useEffect, useState } from 'react';

export const useGoogleApi = () => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('google_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  return {
    apiKey,
    isConfigured: !!apiKey
  };
};
