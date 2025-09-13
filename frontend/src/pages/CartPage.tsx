import { Helmet } from "react-helmet-async";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("cart.title")} - GeSnus</title>
        <meta name="description" content="Review your selected snus products before checkout" />
        <link rel="canonical" href={`${window.location.origin}/cart`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <h2 className="text-xl font-semibold">{t("cart.empty")}</h2>
              <NavLink to="/shop">
                <Button>{t("cart.continue_shopping")}</Button>
              </NavLink>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground">{item.brand}</p>
                      {item.strength && (
                        <p className="text-sm text-muted-foreground">
                          Strength: {item.strength}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 border rounded text-center min-w-[3rem]">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-semibold">
                            ₾{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                            <span className="ml-1">{t("cart.remove")}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">{t("cart.subtotal")}</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate mr-2">
                        {item.name} x{item.quantity}
                      </span>
                      <span>₾{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>{t("cart.subtotal")}</span>
                  <span>₾{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="space-y-3 mt-6">
                  <NavLink to="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      {t("cart.checkout")}
                    </Button>
                  </NavLink>
                  <NavLink to="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      {t("cart.continue_shopping")}
                    </Button>
                  </NavLink>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;