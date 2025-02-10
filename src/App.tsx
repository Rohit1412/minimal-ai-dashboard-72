
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
import PageHeader from "./components/PageHeader";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageHeader />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analyse-video" element={<VideoAnalysis />} />
              <Route path="/analyse-audio" element={<Index />} />
              <Route path="/analyse-text" element={<TextAnalysis />} />
              <Route path="/analyse-image" element={<ImageAnalysis />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
