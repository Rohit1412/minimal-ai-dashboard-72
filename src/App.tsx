
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/translate" element={<Index />} />
              <Route path="/analyse-video" element={<VideoAnalysis />} />
              <Route path="/analyse-audio" element={<Index />} />
              <Route path="/analyse-text" element={<Index />} />
              <Route path="/analyse-image" element={<ImageAnalysis />} />
              <Route path="/history" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
