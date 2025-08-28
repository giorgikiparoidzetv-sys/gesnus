import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type Language = "en" | "ka" | "ru";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations = {
  en: {
    "nav.home": "Home",
    "nav.shop": "Shop", 
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.dashboard": "My Account",
    "nav.cart": "Cart",
    "header.search": "Search products...",
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.logout": "Logout",
    "auth.my_account": "My Account",
    "home.hero.title": "Premium Online Snus Store",
    "home.hero.subtitle": "Discover high-quality snus and tobacco pouches from top brands",
    "home.hero.shop": "Start Shopping",
    "home.hero.learn": "Learn More",
    "home.bestsellers": "Bestsellers",
    "product.add_to_cart": "Add to Cart",
    "cart.title": "Your Cart",
    "cart.empty": "Cart is empty",
    "cart.continue_shopping": "Continue Shopping",
    "cart.remove": "Remove",
    "cart.subtotal": "Subtotal",
    "cart.checkout": "Checkout",
    "cart.mini.view_cart": "View Cart",
    "checkout.title": "Checkout",
    "checkout.processing": "Processing payment...",
    "order.success.title": "Order Successful!",
    "order.success.message": "Thank you for your purchase. Your order will be processed and shipped soon.",
    "order.success.continue": "Continue Shopping",
    "common.error": "Error",
  },
  ka: {
    "nav.home": "მთავარი",
    "nav.shop": "მაღაზია", 
    "nav.about": "ჩვენ შესახებ",
    "nav.contact": "კონტაქტი",
    "nav.login": "შესვლა",
    "nav.dashboard": "ჩემი ანგარიში",
    "nav.cart": "კალათა",
    "header.search": "პროდუქტების ძიება...",
    "auth.login": "შესვლა",
    "auth.register": "რეგისტრაცია",
    "auth.logout": "გასვლა",
    "auth.my_account": "ჩემი ანგარიში",
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
    "nav.dashboard": "Мой аккаунт",
    "nav.cart": "Корзина",
    "header.search": "Поиск продуктов...",
    "auth.login": "Вход",
    "auth.register": "Регистрация",
    "auth.logout": "Выход",
    "auth.my_account": "Мой аккаунт",
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
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ka" || savedLanguage === "ru")) {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      document.documentElement.lang = "en";
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