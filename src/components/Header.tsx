import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import LanguageSwitcher from "./LanguageSwitcher";
import MiniCart from "./MiniCart";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const { t } = useTranslation();
  const cartRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.shop"), path: "/shop" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">SnusShop</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search, Cart and Actions */}
        <div className="flex items-center space-x-3">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("header.search")}
              className="w-48 pl-10"
            />
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Cart */}
          <div ref={cartRef} className="relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-4 w-4" />
              {getTotalItems() > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {getTotalItems()}
                </Badge>
              )}
              <span className="hidden sm:inline-block ml-2">{t("nav.cart")}</span>
            </Button>
            <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>

          {/* Account */}
          <NavLink to={user ? "/dashboard" : "/auth"} className="hidden md:block">
            <Button variant="secondary" size="sm">
              {user ? t("nav.dashboard") : t("nav.login")}
            </Button>
          </NavLink>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            {/* Mobile Search */}
            <div className="relative pt-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("header.search")}
                className="pl-10"
              />
            </div>

            {/* Mobile Language Switcher */}
            <div className="pt-2 md:hidden">
              <LanguageSwitcher />
            </div>

            {/* Mobile Auth Link */}
            <div className="pt-2 md:hidden">
              <NavLink 
                to={user ? "/dashboard" : "/auth"} 
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <Button variant="outline" className="w-full">
                  {user ? t("nav.dashboard") : t("nav.login")}
                </Button>
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;