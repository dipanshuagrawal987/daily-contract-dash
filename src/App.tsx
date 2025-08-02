import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskInput } from "./pages/TaskInput";
import { ScorePage } from "./pages/ScorePage";
import { GameMap } from "./pages/GameMap";
import { TaskDetail } from "./pages/TaskDetail";
import { Profile } from "./pages/Profile";
import { GreatJob } from "./pages/GreatJob";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskInput />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/map" element={<GameMap />} />
          <Route path="/task/:taskIndex" element={<TaskDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/great-job" element={<GreatJob />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
