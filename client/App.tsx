import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Dashboard from "./pages/Dashboard";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTierList from "./pages/CreateTierList";
import { UserProvider } from "./contexts/UserContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games" element={<Games />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/create-tier-list" element={<CreateTierList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
