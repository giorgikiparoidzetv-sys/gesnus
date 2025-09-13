import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart.tsx";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import { Product } from "@/hooks/useProducts";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand || "Premium",
      strength: product.strength,
    });
    onAddToCart?.(product);
  };
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
    <Card className="product-card group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
          />
          {product.salePrice && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
              {t("product.sale")}
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
            <p className="text-xs text-tobacco-light">{t("product.strength")}: {product.strength}</p>
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
              ₾{(product.salePrice || product.price).toFixed(2)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₾{product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full mt-3 transition-all duration-300 hover:scale-105 hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <ShoppingCart className="h-3 w-3 mr-2" />
            {t("product.add_to_cart")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;