import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  brand?: string;
  strength?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? "fill-secondary stroke-secondary" : "stroke-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="product-card group cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {product.brand && (
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>
          )}
          
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {product.strength && (
            <p className="text-xs text-tobacco-light">Strength: {product.strength}</p>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full mt-3 transition-smooth"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          >
            <ShoppingCart className="h-3 w-3 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;