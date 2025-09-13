import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/hooks/useCart';
import { Loader2, MapPin, Phone, ArrowLeft } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const paymentInfoSchema = z.object({
  address: z.string().min(10, 'Address must be at least 10 characters'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
});

type PaymentInfoValues = z.infer<typeof paymentInfoSchema>;

const PaymentInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { items } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = location.state?.totalAmount || 0;
  
  // If no total amount, redirect back to cart
  if (totalAmount <= 0) {
    navigate('/cart');
    return null;
  }

  const form = useForm<PaymentInfoValues>({
    resolver: zodResolver(paymentInfoSchema),
    defaultValues: {
      address: '',
      phone: '',
      fullName: '',
      email: '',
    },
  });

  const onSubmit = async (values: PaymentInfoValues) => {
    setIsSubmitting(true);
    
    try {
      const orderData = {
        ...values,
        totalAmount,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/order`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: t("payment.order_sent"),
          description: t("payment.order_sent.desc"),
        });
        
        // Navigate to bank info page with order data
        navigate('/bank-info', { 
          state: { 
            totalAmount, 
            orderData,
            orderId: result.orderId 
          } 
        });
      } else {
        throw new Error(result.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast({
        variant: "destructive",
        title: t("payment.order_failed"),
        description: t("payment.order_failed.desc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead 
        title={`${t("payment.info_title")} | GeSnus`}
        description={t("payment.info_description")}
      />
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cart')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.back_to_cart")}
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">{t("payment.info_title")}</h1>
            <p className="text-muted-foreground">{t("payment.info_subtitle")}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {t("payment.shipping_info")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("payment.full_name")}</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t("payment.full_name_placeholder")}
                    {...form.register('fullName')}
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("payment.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("payment.email_placeholder")}
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t("payment.address")}</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder={t("payment.address_placeholder")}
                    {...form.register('address')}
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("payment.phone")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("payment.phone_placeholder")}
                    {...form.register('phone')}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">{t("payment.total")}: </span>
                    <span className="text-xl font-bold text-primary">₾{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t("payment.processing")}
                      </>
                    ) : (
                      <>
                        <Phone className="h-4 w-4 mr-2" />
                        {t("payment.submit_order")}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default PaymentInfoPage;