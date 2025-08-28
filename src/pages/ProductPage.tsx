import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import generalWhite from "@/assets/general-white.jpg";
import siberia from "@/assets/siberia.jpg";
import gotebergRape from "@/assets/goteborg-rape.jpg";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product data - in a real app, this would come from an API
  const product = {
    id: 1,
    name: "General White Portion",
    price: 4.99,
    originalPrice: 6.99,
    rating: 5,
    reviewCount: 128,
    brand: "General",
    strength: "Regular",
    flavor: "Traditional",
    portions: 24,
    weight: "16.8g",
    inStock: true,
    description: {
      short: "Classic Swedish snus with traditional tobacco flavor and white portions for a cleaner experience.",
      long: "General White is the most popular snus in Sweden and around the world. It has a spicy tobacco character with hints of bergamot, tea, hay and leather. The portions are white, which means they are not pre-moistened like original portions. This makes them less runny and gives you a longer-lasting flavor release."
    },
    images: [
      generalWhite,
      generalWhite,
      generalWhite,
      generalWhite
    ],
    specifications: [
      { label: "Strength", value: "Regular (8mg/g)" },
      { label: "Flavor", value: "Traditional Tobacco" },
      { label: "Portions", value: "24 portions" },
      { label: "Weight", value: "16.8g" },
      { label: "Format", value: "White Portion" },
      { label: "Origin", value: "Sweden" }
    ]
  };

  // Sample recommended products
  const recommendedProducts = [
    {
      id: 2,
      name: "General Original",
      price: 4.79,
      rating: 5,
      image: generalWhite,
      brand: "General",
      strength: "Regular"
    },
    {
      id: 3,
      name: "General Mint",
      price: 4.99,
      rating: 4,
      image: generalWhite,
      brand: "General",
      strength: "Regular"
    },
    {
      id: 4,
      name: "Göteborg Rapé White",
      price: 4.79,
      rating: 5,
      image: gotebergRape,
      brand: "Göteborg Rapé",
      strength: "Regular"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-secondary stroke-secondary" : "stroke-muted-foreground"
        }`}
      />
    ));
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <span>Home</span> / <span>Shop</span> / <span>General</span> / 
          <span className="text-foreground"> {product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Status */}
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{product.brand}</Badge>
              {product.inStock ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground text-lg">{product.description.short}</p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Strength:</span>
                <p className="font-medium">{product.strength}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Portions:</span>
                <p className="font-medium">{product.portions}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Flavor:</span>
                <p className="font-medium">{product.flavor}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Weight:</span>
                <p className="font-medium">{product.weight}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(false)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(true)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" disabled={!product.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Authentic Product</p>
              </div>
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Fast Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description.long}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">{spec.label}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <section>
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => console.log("Added to cart:", product)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;