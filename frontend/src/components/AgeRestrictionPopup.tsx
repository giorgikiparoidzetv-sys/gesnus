import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AgeRestrictionPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AgeRestrictionPopup = ({ isOpen, onConfirm }: AgeRestrictionPopupProps) => {
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [showCrashScreen, setShowCrashScreen] = useState(false);

  const handleOver18 = () => {
    onConfirm();
  };

  const handleUnder18 = () => {
    setShowSecondPopup(true);
  };

  const handleLetMeIn = () => {
    // Reset all internal state before confirming
    setShowSecondPopup(false);
    setShowFinalPopup(false);
    setShowCrashScreen(false);
    onConfirm();
  };

  const handleRude = () => {
    setShowSecondPopup(false);
    setShowFinalPopup(true);
  };

  const handleCrash = () => {
    setShowFinalPopup(false);
    setShowCrashScreen(true);
  };

  if (showCrashScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-red-600 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 border-red-800 bg-red-50">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl mb-4">💥</div>
            <h1 className="text-2xl font-bold text-red-800">❌ თქვენ არ ხართ 18 წლის – საიტზე შესვლა შეუძლებელია!</h1>
            <p className="text-red-700">
              წვდომა სრულად დაბლოკილია.
            </p>
            <div className="text-sm text-red-600">
              შეცდომა 403: წვდომა აკრძალული
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Main Age Verification Dialog */}
      <Dialog open={isOpen && !showSecondPopup && !showFinalPopup} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Age Verification Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-center text-muted-foreground">
              This website contains tobacco products. You must be 18 or older to enter.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleOver18}
                className="w-full"
                size="lg"
              >
                Yes, I am 18+
              </Button>
              <Button 
                onClick={handleUnder18}
                variant="outline"
                className="w-full"
                size="lg"
              >
                No, I am not 18
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Second Popup with Georgian Text */}
      <Dialog open={showSecondPopup} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              მაშინ რა გავაკეთოთ?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-center text-muted-foreground text-sm">
              აირჩიე ერთ-ერთი ვარიანტი:
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleLetMeIn}
                className="w-full text-sm h-auto py-3 px-4 whitespace-normal leading-tight"
                size="lg"
              >
                არ ვარ სრულ წლოვანი მაგრამ ლომკა მაქ ძმა მიშველე რამე
              </Button>
              <Button 
                onClick={handleRude}
                variant="outline"
                className="w-full text-sm h-auto py-3 px-4 whitespace-normal leading-tight"
                size="lg"
              >
                არ მინდა
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Final Warning Popup */}
      <Dialog open={showFinalPopup} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-red-600">
              გაფრთხილება!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-center text-lg font-medium">
              ჰოდა გააჯვი ახლა აქედან, დროზეეეეეეეე
            </p>
            <Button 
              onClick={handleCrash}
              className="w-full bg-red-600 hover:bg-red-700"
              size="lg"
            >
              Okay
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};