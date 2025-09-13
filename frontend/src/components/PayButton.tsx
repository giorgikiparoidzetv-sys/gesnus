import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { CreditCard } from 'lucide-react';

interface PayButtonProps {
  totalAmount: number;
  disabled?: boolean;
  className?: string;
}

const PayButton = ({ totalAmount, disabled = false, className = "" }: PayButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [lastOrderTime, setLastOrderTime] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayClick = () => {
    if (isProcessing) return;
    
    const now = Date.now();
    if (lastOrderTime && now - lastOrderTime < 60 * 1000) { // 1 minute limit
      toast({
        variant: "destructive",
        title: t("payment.spam_protection"),
        description: t("payment.spam_protection.desc"),
      });
      return;
    }

    if (totalAmount <= 0) {
      toast({
        variant: "destructive",
        title: t("payment.invalid_amount"),
        description: t("payment.invalid_amount.desc"),
      });
      return;
    }

    setIsProcessing(true);
    setLastOrderTime(now);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-info', { state: { totalAmount } });
    }, 500);
  };

  return (
    <Button 
      onClick={handlePayClick}
      disabled={disabled || isProcessing || totalAmount <= 0}
      className={`w-full ${className}`}
      size="lg"
    >
      <CreditCard className="h-4 w-4 mr-2" />
      {isProcessing ? t("payment.processing") : t("payment.pay")} 
      {totalAmount > 0 && ` (₾${totalAmount.toFixed(2)})`}
    </Button>
  );
};

export default PayButton;