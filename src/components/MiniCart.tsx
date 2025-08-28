import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { NavLink } from "react-router-dom";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 z-50">
      <Card className="p-4 bg-background border shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{t("nav.cart")}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>{t("cart.empty")}</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.brand}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs px-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">₾{(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 mt-3 space-y-3">
              <div className="flex justify-between items-center font-semibold">
                <span>{t("cart.subtotal")}</span>
                <span>₾{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <NavLink to="/cart" onClick={onClose} className="block">
                  <Button variant="outline" className="w-full">
                    {t("cart.mini.view_cart")}
                  </Button>
                </NavLink>
                <NavLink to="/checkout" onClick={onClose} className="block">
                  <Button className="w-full">
                    {t("cart.checkout")}
                  </Button>
                </NavLink>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default MiniCart;