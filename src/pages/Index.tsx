
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { BarChart3, BrainCircuit, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  // Mock data - replace with real data in production
  const userData = {
    name: "John",
    apiCalls: 1234,
    analysedData: 567,
    accuracy: 94.3
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      <main className="p-8 md:ml-[120px] lg:ml-[280px]">
        <div className="max-w-7xl mx-auto">
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-left"
          >
            <h2 className="text-2xl font-medium text-foreground/60">Welcome,</h2>
            <h1 className="text-4xl font-bold text-foreground mt-2">{userData.name}</h1>
            <p className="text-xl text-foreground/80 mt-4">
              Unlock the power of AI analytics with our comprehensive suite of tools
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 backdrop-blur-sm bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">API Calls</p>
                  <h3 className="text-2xl font-bold text-foreground mt-2">{userData.apiCalls}</h3>
                </div>
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <BrainCircuit className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Data Analysed</p>
                  <h3 className="text-2xl font-bold text-foreground mt-2">{userData.analysedData}</h3>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Accuracy</p>
                  <h3 className="text-2xl font-bold text-foreground mt-2">{userData.accuracy}%</h3>
                </div>
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-6 backdrop-blur-sm bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Performance Analytics</h3>
                <BarChart3 className="w-5 h-5 text-foreground/60" />
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                <p className="text-foreground/60">Analytics Chart Placeholder</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
