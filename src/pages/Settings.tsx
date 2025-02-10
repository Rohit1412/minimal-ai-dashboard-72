
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const isMobile = useIsMobile();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleApiKey.trim()) {
      toast.error("Please enter a valid Google API key");
      return;
    }
    // Store in localStorage temporarily - we'll update this to use Supabase later
    localStorage.setItem("google_api_key", googleApiKey);
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="h-[80px] w-full bg-background fixed top-0 z-40 border-none flex items-center justify-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Settings
        </h1>
      </div>
      <Sidebar />
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-[calc(80px+5vh)] pb-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Application Settings</h2>
            <p className="text-muted-foreground mt-2">
              Configure your application settings and API keys here.
            </p>
          </div>
          
          <Card className="p-6 dark:bg-[#1A1F2C] dark:border-white/10">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="googleApiKey">Google API Key</Label>
                  <Input
                    id="googleApiKey"
                    type="password"
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    placeholder="Enter your Google API Key"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    This API key will be used for Google services across the application.
                    Visit the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a> to get your API key.
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Save Settings
              </Button>
            </form>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
