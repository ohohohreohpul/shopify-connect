import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import UeberUns from "./pages/UeberUns";
import Kontakt from "./pages/Kontakt";
import Auftragsarbeiten from "./pages/Auftragsarbeiten";
import SoGehts from "./pages/SoGehts";
import Inspiration from "./pages/Inspiration";
import FAQ from "./pages/FAQ";
import Versand from "./pages/Versand";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product/:handle" element={<ProductPage />} />
      <Route path="/ueber-uns" element={<UeberUns />} />
      <Route path="/kontakt" element={<Kontakt />} />
      <Route path="/auftragsarbeiten" element={<Auftragsarbeiten />} />
      <Route path="/so-gehts" element={<SoGehts />} />
      <Route path="/inspiration" element={<Inspiration />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/versand" element={<Versand />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      <Route path="/agb" element={<AGB />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
