import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  // Find the product by slug (using id as slug for now)
  const product = products.find(p => p.slug === id || p.id === id);

  const handleQuantityChange = (increase: boolean) => {
    if (increase) {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Product not found</div>
        </div>
      </div>
    );
  }

  // Get recommended products (other products from same brand or similar)
  const recommendedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 3);

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
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Single Image - No thumbnails since we only have one image */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Status */}
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{product.brand}</Badge>
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">In Stock ({product.stock})</Badge>
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
                ({product.rating} rating)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold">${product.salePrice || product.price}</span>
              {product.salePrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price}
                </span>
              )}
              {product.salePrice && (
                <Badge variant="destructive">
                  Save ${(product.price - product.salePrice).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground text-lg">{product.shortDescription}</p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Strength:</span>
                <p className="font-medium">{product.strength}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Nicotine:</span>
                <p className="font-medium">{product.nicotineMg}mg/g</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Category:</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">SKU:</span>
                <p className="font-medium">{product.sku}</p>
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
              <Button size="lg" className="flex-1" disabled={product.stock === 0} onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ${((product.salePrice || product.price) * quantity).toFixed(2)}
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
                  {product.longDescription}
                </p>
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Strength:</span>
                    <span className="font-medium">{product.strength}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Nicotine:</span>
                    <span className="font-medium">{product.nicotineMg}mg/g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-medium">{product.currency}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
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