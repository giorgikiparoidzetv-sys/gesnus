import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { NavLink } from "react-router-dom";

const CheckoutPage = () => {
  const { items, getTotalPrice } = useCart();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: t("common.error"),
        description: t("cart.empty"),
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer_email: user?.email || "guest@example.com",
        },
      });

      if (error) {
        console.error('Checkout error:', error);
        toast({
          title: t("common.error"),
          description: "Failed to create checkout session",
          variant: "destructive",
        });
        return;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: t("common.error"),
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>{t("checkout.title")} - SnusShop</title>
          <meta name="description" content="Complete your snus purchase securely" />
          <link rel="canonical" href={`${window.location.origin}/checkout`} />
        </Helmet>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="p-8">
            <div className="text-center space-y-4">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <h2 className="text-xl font-semibold">{t("cart.empty")}</h2>
              <NavLink to="/shop">
                <Button>{t("cart.continue_shopping")}</Button>
              </NavLink>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("checkout.title")} - SnusShop</title>
        <meta name="description" content="Complete your snus purchase securely with Stripe" />
        <link rel="canonical" href={`${window.location.origin}/checkout`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">{t("checkout.title")}</h1>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.brand} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    ₾{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>₾{getTotalPrice().toFixed(2)}</span>
            </div>
          </Card>

          {/* Payment Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Payment</h3>
              </div>
              <p className="text-muted-foreground">
                You will be redirected to Stripe for secure payment processing.
              </p>
              <Button 
                onClick={handleCheckout} 
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t("checkout.processing")}
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay ₾{getTotalPrice().toFixed(2)} with Stripe
                  </>
                )}
              </Button>
            </div>
          </Card>

          <div className="text-center">
            <NavLink to="/cart" className="text-muted-foreground hover:text-foreground">
              ← Back to cart
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;