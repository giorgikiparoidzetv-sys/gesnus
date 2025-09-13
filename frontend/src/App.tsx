import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/Header";
import { AgeRestrictionPopup } from "@/components/AgeRestrictionPopup";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import GamePage from "@/pages/GamePage";
import NotFound from "./pages/NotFound";
import AuthPage from "@/pages/AuthPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ConfirmEmailPage from "@/pages/ConfirmEmailPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { CartProvider } from "@/hooks/useCart.tsx";
import { TranslationProvider } from "@/hooks/useTranslation.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [showAgeRestriction, setShowAgeRestriction] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const ageVerified = localStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowAgeRestriction(true);
    }
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowAgeRestriction(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TranslationProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-success" element={<OrderSuccessPage />} />
                      <Route path="/game" element={<GamePage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/reset-password" element={<ResetPasswordPage />} />
                      <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <DashboardPage />
                          </ProtectedRoute>
                        }
                      />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
                <AgeRestrictionPopup 
                  isOpen={showAgeRestriction}
                  onConfirm={handleAgeConfirm}
                />
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </TranslationProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
