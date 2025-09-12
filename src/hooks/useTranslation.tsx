import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type Language = "en" | "ka";

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
    "nav.game": "Giveaway",
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
    "common.coming_soon": "Will Be Soon",
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have a question about our products or need assistance with your order? We're here to help and would love to hear from you.",
    "contact.info": "Contact Information", 
    "contact.email.title": "Email Us",
    "contact.email.desc": "We respond within 24 hours",
    "contact.phone.title": "Call Us",
    "contact.phone.desc": "24/7 Support Available",
    "contact.address.title": "Visit Us",
    "contact.address.content": "Tbilisi, Georgia",
    "contact.address.desc": "Showroom by appointment",
    "contact.hours.title": "Support Hours",
    "contact.hours.content": "24/7 Online Support",
    "contact.hours.desc": "Live chat available",
    "contact.form.title": "Send us a Message",
    "contact.form.subtitle": "Fill out the form below and we'll get back to you as soon as possible.",
    "contact.form.first_name": "First Name",
    "contact.form.last_name": "Last Name", 
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.call": "Call Instead",
    "contact.business_hours": "Business Hours",
    "contact.support_hours": "Customer Support",
    "contact.office_hours": "Office Hours: 08:00 — 03:00",
    "contact.support_247": "24/7 Support Available",
    "contact.faq.title": "Frequently Asked Questions",
    "contact.faq.shipping": "Do you ship internationally?",
    "contact.faq.shipping.answer": "Yes, we ship to over 40 countries worldwide.",
    "contact.faq.time": "What are your shipping times?",
    "contact.faq.time.answer": "2-5 business days for EU, 5-10 days elsewhere.",
    "contact.faq.bulk": "Do you offer bulk discounts?",
    "contact.faq.bulk.answer": "Yes, contact us for bulk pricing options.",
  },
  ka: {
    "nav.home": "მთავარი",
    "nav.shop": "მაღაზია", 
    "nav.about": "ჩვენ შესახებ",
    "nav.contact": "კონტაქტი",
    "nav.login": "შესვლა",
    "nav.dashboard": "ჩემი ანგარიში",
    "nav.cart": "კალათა",
    "nav.game": "გათამაშება",
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
    "common.coming_soon": "მალე დაემატება",
    "contact.title": "დაგვიკავშირდით",
    "contact.subtitle": "გაქვთ კითხვა ჩვენი პროდუქტების შესახებ ან დახმარება სჭირდებათ შეკვეთაში? ჩვენ ვართ აქ დასახმარებლად და მოხარული ვარ თქვენგან მოსმენა.",
    "contact.info": "საკონტაქტო ინფორმაცია",
    "contact.email.title": "ელფოსტა",
    "contact.email.desc": "ვპასუხობთ 24 საათში",
    "contact.phone.title": "დაგვირეკეთ",
    "contact.phone.desc": "24/7 მხარდაჭერა",
    "contact.address.title": "მოსალოცად",
    "contact.address.content": "თბილისი, საქართველო",
    "contact.address.desc": "შოურუმი ნაწინასწარ შეთანხმებით",
    "contact.hours.title": "მხარდაჭერის საათები",
    "contact.hours.content": "24/7 ონლაინ მხარდაჭერა",
    "contact.hours.desc": "ლაივ ჩატი ხელმისაწვდომია",
    "contact.form.title": "გამოგვიგზავნეთ შეტყობინება",
    "contact.form.subtitle": "შეავსეთ ქვემოთ მოცემული ფორმა და ჩვენ მალე დაგიბრუნდებით.",
    "contact.form.first_name": "სახელი",
    "contact.form.last_name": "გვარი",
    "contact.form.email": "ელფოსტის მისამართი", 
    "contact.form.phone": "ტელეფონის ნომერი",
    "contact.form.subject": "თემა",
    "contact.form.message": "შეტყობინება",
    "contact.form.send": "შეტყობინების გაგზავნა",
    "contact.form.call": "ნაცვლად დარეკვა",
    "contact.business_hours": "სამუშაო საათები",
    "contact.support_hours": "მომხმარებელთა მხარდაჭერა",
    "contact.office_hours": "ოფისის საათები: 08:00 — 03:00",
    "contact.support_247": "24/7 მხარდაჭერა ხელმისაწვდომია",
    "contact.faq.title": "ხშირად დასმული კითხვები",
    "contact.faq.shipping": "ახორციელებთ საერთაშორისო მიწოდებას?",
    "contact.faq.shipping.answer": "დიახ, ვახორციელებთ მიწოდებას 40-ზე მეტ ქვეყანაში.",
    "contact.faq.time": "რა არის თქვენი მიწოდების ვადები?",
    "contact.faq.time.answer": "2-5 სამუშაო დღე ევროკავშირისთვის, 5-10 დღე სხვა ადგილებში.",
    "contact.faq.bulk": "გთავazობთ ნაყარი ფასდაკლებებს?",
    "contact.faq.bulk.answer": "დიახ, დაგვიკავშირდით მასობრივი ფასების ვარიანტებისთვის.",
  },
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ka")) {
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