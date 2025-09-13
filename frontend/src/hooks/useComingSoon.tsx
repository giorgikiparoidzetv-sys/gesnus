import { useTranslation } from "@/hooks/useTranslation.tsx";
import { toast } from "@/hooks/use-toast";

export const useComingSoon = () => {
  const { t } = useTranslation();

  const showComingSoon = () => {
    toast({
      title: t("common.coming_soon"),
      description: t("common.coming_soon"),
    });
  };

  return { showComingSoon };
};