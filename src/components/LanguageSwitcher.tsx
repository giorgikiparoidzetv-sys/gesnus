import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation.tsx";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="text-xs px-2 py-1 h-7"
      >
        🇺🇸 EN
      </Button>
      <Button
        variant={language === "ka" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("ka")}
        className="text-xs px-2 py-1 h-7"
      >
        🇬🇪 KA
      </Button>
    </div>
  );
};

export default LanguageSwitcher;