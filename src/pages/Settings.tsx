
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { APIConfigSection } from "@/components/settings/APIConfigSection";
import { AppearanceSection } from "@/components/settings/AppearanceSection";
import { NotificationsSection } from "@/components/settings/NotificationsSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { useTheme } from "@/providers/ThemeProvider";

const Settings = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [apiCallLimit, setApiCallLimit] = useState("100");
  const [fontSize, setFontSize] = useState("medium");
  const [autoSave, setAutoSave] = useState(true);
  const [dataRetention, setDataRetention] = useState("30");
  const [notifications, setNotifications] = useState({
    email: false,
    desktop: false,
    mobile: false,
    updates: true,
    security: true,
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load saved settings from localStorage
    const savedEmailNotifications = localStorage.getItem("email_notifications") === "true";
    const savedApiCallLimit = localStorage.getItem("api_call_limit") || "100";
    const savedFontSize = localStorage.getItem("font_size") || "medium";
    const savedAutoSave = localStorage.getItem("auto_save") !== "false";
    const savedDataRetention = localStorage.getItem("data_retention") || "30";
    const savedNotifications = JSON.parse(localStorage.getItem("notifications") || "{}");

    setEmailNotifications(savedEmailNotifications);
    setApiCallLimit(savedApiCallLimit);
    setFontSize(savedFontSize);
    setAutoSave(savedAutoSave);
    setDataRetention(savedDataRetention);
    setNotifications({
      email: false,
      desktop: false,
      mobile: false,
      updates: true,
      security: true,
      ...savedNotifications,
    });

    // Apply font size
    document.documentElement.style.fontSize = 
      fontSize === "large" ? "18px" : 
      fontSize === "small" ? "14px" : "16px";

    // Set default language to English
    document.documentElement.lang = 'en';
  }, [fontSize]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store settings in localStorage
    localStorage.setItem("email_notifications", emailNotifications.toString());
    localStorage.setItem("api_call_limit", apiCallLimit);
    localStorage.setItem("font_size", fontSize);
    localStorage.setItem("auto_save", autoSave.toString());
    localStorage.setItem("data_retention", dataRetention);
    localStorage.setItem("notifications", JSON.stringify(notifications));

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
            <h2 className="text-2xl font-semibold text-foreground dark:text-white">Application Settings</h2>
            <p className="text-muted-foreground dark:text-gray-300 mt-2">
              Configure your application settings and preferences here.
            </p>
          </div>
          
          <Card className="p-6 dark:bg-[#1A1F2C] dark:border-white/10">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <APIConfigSection
                apiCallLimit={apiCallLimit}
                dataRetention={dataRetention}
                onApiCallLimitChange={setApiCallLimit}
                onDataRetentionChange={setDataRetention}
              />

              <AppearanceSection
                theme={currentTheme}
                fontSize={fontSize}
                onThemeChange={setTheme}
                onFontSizeChange={setFontSize}
              />

              <NotificationsSection
                notifications={notifications}
                onNotificationsChange={setNotifications}
              />

              <PreferencesSection
                autoSave={autoSave}
                onAutoSaveChange={setAutoSave}
              />

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
