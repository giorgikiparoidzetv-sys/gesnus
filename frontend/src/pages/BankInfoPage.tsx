import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Copy, CheckCircle, ArrowLeft, Building2, CreditCard } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const BankInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const totalAmount = location.state?.totalAmount || 0;
  const orderData = location.state?.orderData;
  const orderId = location.state?.orderId;
  
  // If no order data, redirect back to cart
  if (!totalAmount || !orderData) {
    navigate('/cart');
    return null;
  }

  const deliveryFee = 5; // Fixed delivery fee
  const finalAmount = totalAmount + deliveryFee;

  const bankAccounts = [
    { 
      bank: t("payment.bank_georgia"), 
      number: 'GE07BG0000000580750742',
      key: 'georgia'
    },
    { 
      bank: t("payment.bank_tbc"), 
      number: 'GE72TB7141645064300103',
      key: 'tbc'
    },
  ];

  const copyToClipboard = async (text: string, fieldKey: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldKey);
      toast({
        title: t("payment.copied"),
        description: t("payment.copied.desc"),
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast({
        variant: "destructive",
        title: t("common.error"),
        description: t("payment.copy_failed"),
      });
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <>
      <SEOHead 
        title={`${t("payment.bank_title")} | GeSnus`}
        description={t("payment.bank_description")}
      />
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/payment-info', { state: { totalAmount } })}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("common.back")}
            </Button>
            
            <h1 className="text-3xl font-bold mb-2">{t("payment.bank_title")}</h1>
            <p className="text-muted-foreground">{t("payment.bank_subtitle")}</p>
          </div>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                {t("payment.order_confirmed")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orderId && (
                <p className="text-sm text-muted-foreground mb-3">
                  {t("payment.order_id")}: <strong>{orderId}</strong>
                </p>
              )}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("payment.subtotal")}:</span>
                  <span>₾{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("payment.delivery_fee")}:</span>
                  <span>₾{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>{t("payment.total")}:</span>
                  <span className="text-primary">₾{finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                {t("payment.payment_instructions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t("payment.payment_instructions.desc")}
              </p>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{t("payment.amount_to_pay")}:</h3>
                <p className="text-2xl font-bold text-primary">₾{finalAmount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("payment.includes_delivery")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bank Accounts */}
          <div className="space-y-4 mb-6">
            {bankAccounts.map((account) => (
              <Card key={account.key}>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Building2 className="h-5 w-5 mr-2" />
                    {account.bank}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-mono text-sm">{account.number}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(account.number, account.key)}
                      className="ml-2"
                    >
                      {copiedField === account.key ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="ml-1">
                        {copiedField === account.key ? t("payment.copied") : t("payment.copy")}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Note */}
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-orange-800 mb-2">
                {t("payment.important_note")}
              </h3>
              <p className="text-sm text-orange-700">
                {t("payment.important_note.desc")}
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleContinueShopping}
              variant="outline"
              className="flex-1"
            >
              {t("payment.continue_shopping")}
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              className="flex-1"
            >
              {t("payment.contact_support")}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default BankInfoPage;