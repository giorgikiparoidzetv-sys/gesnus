import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { toast } from "@/components/ui/use-toast";
import { NavLink, useNavigate } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const DELIVERY_FEE = 5; // 5 GEL delivery fee

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = t("checkout.required_field");
    }

    if (!formData.email.trim()) {
      errors.email = t("checkout.required_field");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("checkout.invalid_email");
    }

    if (!formData.phone.trim()) {
      errors.phone = t("checkout.required_field");
    }

    if (!formData.address.trim()) {
      errors.address = t("checkout.required_field");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmitOrder = async () => {
    if (items.length === 0) {
      toast({
        title: t("common.error"),
        description: t("cart.empty"),
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: t("common.error"),
        description: t("checkout.required_field"),
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order data
      const orderData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        totalAmount: getTotalPrice(),
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Get backend URL from environment
      const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
      
      // Submit order to backend
      const response = await fetch(`${backendUrl}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();

      if (result.success) {
        // Clear cart
        clearCart();
        
        // Show success message
        toast({
          title: t("common.success"),
          description: "Order submitted successfully!",
        });

        // Navigate to order success page
        navigate("/order-success");
      } else {
        throw new Error(result.message || 'Order submission failed');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: t("common.error"),
        description: "Failed to submit order. Please try again.",
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
          <title>{t("checkout.title")} - GeSnus</title>
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

  const subtotal = getTotalPrice();
  const totalWithDelivery = subtotal + DELIVERY_FEE;

  return (
    <>
      <Helmet>
        <title>{t("checkout.title")} - GeSnus</title>
        <meta name="description" content="Complete your snus purchase with secure checkout" />
        <link rel="canonical" href={`${window.location.origin}/checkout`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">{t("checkout.form.title")}</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">{t("checkout.form.full_name")}</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t("checkout.form.full_name_placeholder")}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={formErrors.fullName ? "border-red-500" : ""}
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">{t("checkout.form.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("checkout.form.email_placeholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">{t("checkout.form.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("checkout.form.phone_placeholder")}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">{t("checkout.form.address")}</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder={t("checkout.form.address_placeholder")}
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={formErrors.address ? "border-red-500" : ""}
                  />
                  {formErrors.address && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.address}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">{t("checkout.order_summary")}</h2>
              
              <div className="space-y-4">
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
              
              <Separator className="my-6" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("checkout.subtotal")}</span>
                  <span>₾{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("checkout.delivery_fee")}</span>
                  <span>₾{DELIVERY_FEE.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>{t("checkout.total")}</span>
                  <span>₾{totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handleSubmitOrder} 
                disabled={isProcessing}
                className="w-full mt-6"
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
                    {t("checkout.place_order")}
                  </>
                )}
              </Button>
            </Card>
          </div>
        </div>

        <div className="text-center mt-8">
          <NavLink to="/cart" className="text-muted-foreground hover:text-foreground">
            ← {t("common.back_to_cart")}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;