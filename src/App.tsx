import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import VideoAnalysis from "./pages/VideoAnalysis";
import ImageAnalysis from "./pages/ImageAnalysis";
import NotFound from "./pages/NotFound";
import TextAnalysis from "./pages/TextAnalysis";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Login from "./pages/Login";
import AudioAnalysis from "./pages/AudioAnalysis";
import PageHeader from "./components/PageHeader";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background transition-colors duration-300">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <Index />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyse-video"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <VideoAnalysis />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyse-audio"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <AudioAnalysis />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyse-text"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <TextAnalysis />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analyse-image"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <ImageAnalysis />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <History />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <Profile />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <div className="flex">
                        <Sidebar />
                        <div className="flex-1">
                          <PageHeader />
                          <Settings />
                        </div>
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
