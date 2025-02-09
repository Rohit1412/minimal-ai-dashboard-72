
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { BarChart3, BrainCircuit, Sparkles, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <main className="pl-[80px] lg:pl-[240px] p-8">
        <div className="max-w-7xl mx-auto text-center">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-2">AI Analytics Overview</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 backdrop-blur-sm bg-gray-800/80 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Active Models</p>
                  <h3 className="text-2xl font-bold text-white mt-2">12</h3>
                </div>
                <div className="p-2 bg-purple-900/50 rounded-lg">
                  <BrainCircuit className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-gray-800/80 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Predictions</p>
                  <h3 className="text-2xl font-bold text-white mt-2">8.2K</h3>
                </div>
                <div className="p-2 bg-blue-900/50 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-gray-800/80 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Accuracy</p>
                  <h3 className="text-2xl font-bold text-white mt-2">94.3%</h3>
                </div>
                <div className="p-2 bg-green-900/50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-6 backdrop-blur-sm bg-gray-800/80 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Performance Analytics</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-400">Analytics Chart Placeholder</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
