import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import RFPManagement from "./pages/RFPManagement";
import RFPDetail from "./pages/RFPDetail";
import AgentWorkspace from "./pages/AgentWorkspace";
import Validation from "./pages/Validation";
import Outputs from "./pages/Outputs";
import Analytics from "./pages/Analytics";
import SystemHealth from "./pages/SystemHealth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rfp" element={<RFPManagement />} />
            <Route path="/rfp/:id" element={<RFPDetail />} />
            <Route path="/agents" element={<AgentWorkspace />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="/outputs" element={<Outputs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/health" element={<SystemHealth />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
