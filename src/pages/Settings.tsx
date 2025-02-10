
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const Settings = () => {
  const [googleApiKey, setGoogleApiKey] = useState("");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // This is where we'll handle the API key saving once you choose a storage method
    console.log("Saving settings...");
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="min-h-screen w-[80vw] ml-auto mr-[10vw] px-8 pt-5 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-8">Settings</h1>
          
          <Card className="max-w-2xl mx-auto p-6 dark:bg-[#1A1F2C] dark:border-white/10">
            <form onSubmit={handleSaveSettings} className="space-y-6">
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
                </p>
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
