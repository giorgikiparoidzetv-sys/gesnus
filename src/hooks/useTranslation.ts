import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type Language = "ka" | "ru";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  ka: {
    "nav.home": "მთავარი",
    "nav.shop": "მაღაზია", 
    "nav.about": "ჩვენ შესახებ",
    "nav.contact": "კონტაქტი",
    "nav.login": "შესვლა",
    "nav.dashboard": "დაშბორდი",
    "nav.cart": "კალათა",
    "header.search": "პროდუქტების ძიება...",
    "home.hero.title": "პრემიუმ სნუსის ონლაინ მაღაზია",
    "home.hero.subtitle": "აღმოაჩინეთ ტოპ ბრენდების უმაღლესი ხარისხის სნუსი და თამბაქოს ჩანთები",
    "home.hero.shop": "დაიწყე შოპინგი",
    "home.hero.learn": "გაიგე მეტი",
    "home.bestsellers": "ყველაზე გაყიდვადი პროდუქტები",
    "product.add_to_cart": "კალათაში დამატება",
    "cart.title": "თქვენი კალათა",
    "cart.empty": "კალათა ცარიელია",
    "cart.continue_shopping": "შოპინგის გაგრძელება",
    "cart.remove": "წაშლა",
    "cart.subtotal": "ჯამური",
    "cart.checkout": "გადახდა",
    "cart.mini.view_cart": "კალათის ნახვა",
    "checkout.title": "გადახდა",
    "checkout.processing": "გადახდის დამუშავება...",
    "order.success.title": "შეკვეთა წარმატებულია!",
    "order.success.message": "გმადლობთ შენაძენისთვის. თქვენი შეკვეთა დამუშავდება და მალე გამოგეგზავნებათ.",
    "order.success.continue": "შოპინგის გაგრძელება",
    "common.error": "შეცდომა",
  },
  ru: {
    "nav.home": "Главная",
    "nav.shop": "Магазин",
    "nav.about": "О нас", 
    "nav.contact": "Контакты",
    "nav.login": "Вход",
    "nav.dashboard": "Панель управления",
    "nav.cart": "Корзина",
    "header.search": "Поиск продуктов...",
    "home.hero.title": "Премиальный интернет-магазин снюса",
    "home.hero.subtitle": "Откройте для себя высококачественный снюс и табачные пакеты от ведущих брендов",
    "home.hero.shop": "Начать покупки",
    "home.hero.learn": "Узнать больше",
    "home.bestsellers": "Бестселлеры",
    "product.add_to_cart": "В корзину",
    "cart.title": "Ваша корзина",
    "cart.empty": "Корзина пуста",
    "cart.continue_shopping": "Продолжить покупки",
    "cart.remove": "Удалить",
    "cart.subtotal": "Итого",
    "cart.checkout": "Оформить заказ",
    "cart.mini.view_cart": "Посмотреть корзину",
    "checkout.title": "Оформление заказа",
    "checkout.processing": "Обработка платежа...",
    "order.success.title": "Заказ успешно оформлен!",
    "order.success.message": "Спасибо за покупку. Ваш заказ будет обработан и отправлен в ближайшее время.",
    "order.success.continue": "Продолжить покупки",
    "common.error": "Ошибка",
  }
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("ka");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "ka" || savedLanguage === "ru")) {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      document.documentElement.lang = "ka";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};