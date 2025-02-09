
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { BarChart3, BrainCircuit, Sparkles, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pl-[80px] lg:pl-[240px] p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">AI Analytics Overview</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Analytics Cards */}
            <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Models</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">12</h3>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BrainCircuit className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Predictions</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">8.2K</h3>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accuracy</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">94.3%</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            {/* Large Analytics Card */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 p-6 backdrop-blur-sm bg-white/80 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500">Analytics Chart Placeholder</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
