import { useState } from "react";
import { ArrowRight, Truck, Shield, Headphones, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import heroImage from "@/assets/hero-snus.jpg";
import generalWhite from "@/assets/general-white.jpg";
import siberia from "@/assets/siberia.jpg";
import gotebergRape from "@/assets/goteborg-rape.jpg";
import odens from "@/assets/odens.jpg";

const HomePage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return;
    }
    toast({
      title: "Success!",
      description: "You've been successfully subscribed to our newsletter",
    });
    setEmail("");
  };

  const handleAddToCart = (product: any) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      name: "General White Portion",
      price: 4.99,
      originalPrice: 6.99,
      rating: 5,
      image: generalWhite,
      brand: "General",
      strength: "Regular"
    },
    {
      id: 2,
      name: "Siberia White Dry",
      price: 5.49,
      rating: 4,
      image: siberia,
      brand: "Siberia",
      strength: "Extra Strong"
    },
    {
      id: 3,
      name: "Göteborg Rapé White",
      price: 4.79,
      rating: 5,
      image: gotebergRape,
      brand: "Göteborg Rapé",
      strength: "Regular"
    },
    {
      id: 4,
      name: "Odens Cold Dry",
      price: 3.99,
      originalPrice: 4.99,
      rating: 4,
      image: odens,
      brand: "Odens",
      strength: "Strong"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free shipping on orders over $50. Express delivery available."
    },
    {
      icon: Shield,
      title: "Premium Quality",
      description: "Authentic products from trusted brands. Quality guaranteed."
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "24/7 customer service. We're here to help with any questions."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {t("home.hero.title")}
                <span className="block text-secondary">Collection</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-md">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/shop">
                    {t("home.hero.shop")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/about">{t("home.hero.learn")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                <img
                  src={heroImage}
                  alt="Premium Snus Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t("home.bestsellers")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our most popular snus products, loved by customers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing the best snus shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto gold-gradient text-primary p-8 lg:p-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Stay Updated
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive offers, new product launches, and snus tips
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-foreground"
                  required
                />
                <Button type="submit" variant="secondary" size="lg">
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;