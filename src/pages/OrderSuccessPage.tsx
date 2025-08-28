import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { NavLink } from "react-router-dom";

const OrderSuccessPage = () => {
  const { clearCart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    // Clear cart on successful order
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Helmet>
        <title>{t("order.success.title")} - SnusShop</title>
        <meta name="description" content="Your order has been successfully placed and is being processed" />
        <link rel="canonical" href={`${window.location.origin}/order-success`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-green-600">
                {t("order.success.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("order.success.message")}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <NavLink to="/shop" className="block">
                <Button size="lg" className="w-full">
                  {t("order.success.continue")}
                </Button>
              </NavLink>
              
              <NavLink to="/" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  {t("nav.home")}
                </Button>
              </NavLink>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default OrderSuccessPage;