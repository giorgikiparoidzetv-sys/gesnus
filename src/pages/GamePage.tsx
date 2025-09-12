import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { toast } from "@/hooks/use-toast";

const GamePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Show coming soon message when component mounts
    toast({
      title: t("common.coming_soon"),
      description: t("common.coming_soon"),
    });
  }, [t]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">🎮</h1>
        <p className="text-xl text-muted-foreground">
          {t("common.coming_soon")}
        </p>
      </div>
    </div>
  );
};

export default GamePage;