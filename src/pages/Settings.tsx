
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [apiCallLimit, setApiCallLimit] = useState("100");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load saved settings from localStorage
    const savedGoogleApiKey = localStorage.getItem("google_api_key");
    const savedEmailNotifications = localStorage.getItem("email_notifications") === "true";
    const savedDarkMode = localStorage.getItem("dark_mode") === "true";
    const savedLanguage = localStorage.getItem("language") || "english";
    const savedApiCallLimit = localStorage.getItem("api_call_limit") || "100";

    setGoogleApiKey(savedGoogleApiKey || "");
    setEmailNotifications(savedEmailNotifications);
    setDarkMode(savedDarkMode);
    setLanguage(savedLanguage);
    setApiCallLimit(savedApiCallLimit);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleApiKey.trim()) {
      toast.error("Please enter a valid Google API key");
      return;
    }

    // Store in localStorage temporarily
    localStorage.setItem("google_api_key", googleApiKey);
    localStorage.setItem("email_notifications", emailNotifications.toString());
    localStorage.setItem("dark_mode", darkMode.toString());
    localStorage.setItem("language", language);
    localStorage.setItem("api_call_limit", apiCallLimit);

    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
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
              Configure your application settings and preferences here.
            </p>
          </div>
          
          <Card className="p-6 dark:bg-[#1A1F2C] dark:border-white/10">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* API Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Configuration</h3>
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
                    Visit the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a> to get your API key.
                  </p>
                </div>

                <div>
                  <Label htmlFor="apiCallLimit">API Call Limit</Label>
                  <Input
                    id="apiCallLimit"
                    type="number"
                    value={apiCallLimit}
                    onChange={(e) => setApiCallLimit(e.target.value)}
                    placeholder="Enter API call limit"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </select>
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
