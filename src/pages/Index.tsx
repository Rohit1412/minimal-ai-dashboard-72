
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { BarChart3, BrainCircuit, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { APP_TITLE } from "@/constants/text";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useQuery } from "@tanstack/react-query";

interface UsageData {
  name: string;
  apiCalls: number;
  analysedData: number;
  accuracy: number;
  apiUsage: { name: string; calls: number; }[];
  fileTypes: { name: string; files: number; }[];
  accuracyTrend: { name: string; accuracy: number; }[];
}

const fetchUsageData = async (): Promise<UsageData> => {
  const response = await fetch('https://api.yourdomain.com/usage-data');
  if (!response.ok) {
    throw new Error('Failed to fetch usage data');
  }
  return response.json();
};

const Index = () => {
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ['usageData'],
    queryFn: fetchUsageData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const isMobile = useIsMobile();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error loading data</div>;
  }

  if (!usageData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background font-archivo">
      <div className="h-[80px] w-full bg-background fixed top-0 z-40 border-none flex items-center justify-center">
        <h1 className={`font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent ${isMobile ? 'text-lg' : 'text-2xl'}`}>
          {APP_TITLE}
        </h1>
      </div>
      <Sidebar />
      <main className={`min-h-screen ${isMobile ? 'w-full px-4' : 'w-[80vw] ml-auto mr-[10vw] px-8'} pt-[calc(80px+5vh)] pb-8`}>
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-left"
        >
          <div className="flex items-center gap-2">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-muted-foreground dark:text-white`}>Welcome,</h2>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-primary dark:text-[#D6BCFA]`}>{usageData.name}</h1>
          </div>
          <p className={`${isMobile ? 'text-base' : 'text-xl'} text-muted-foreground dark:text-white/80 mt-4`}>
            Unlock the power of AI analytics with our comprehensive suite of tools
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground dark:text-white/70`}>API Calls</p>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground dark:text-white mt-2`}>{usageData.apiCalls}</h3>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground dark:text-white/70`}>Data Analysed</p>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground dark:text-white mt-2`}>{usageData.analysedData}</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground dark:text-white/70`}>Accuracy</p>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground dark:text-white mt-2`}>{usageData.accuracy}%</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-6 backdrop-blur-sm bg-background/80 border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-foreground dark:text-white`}>API Usage Trend</h3>
                  <BarChart3 className="w-5 h-5 text-muted-foreground dark:text-white/70" />
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData.apiUsage}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="calls" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-foreground dark:text-white`}>File Type Distribution</h3>
                  <BarChart3 className="w-5 h-5 text-muted-foreground dark:text-white/70" />
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData.fileTypes}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="files" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-foreground dark:text-white`}>Accuracy Trend</h3>
                  <TrendingUp className="w-5 h-5 text-muted-foreground dark:text-white/70" />
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={usageData.accuracyTrend}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.2} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
