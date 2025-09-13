import { useState } from "react";
import { Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useTranslation } from "@/hooks/useTranslation.tsx";
import SEOHead from "@/components/SEOHead";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShopPage = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStrength, setSelectedStrength] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const { 
    products, 
    loading, 
    searchProducts, 
    sortProducts, 
    getBrands, 
    getStrengths 
  } = useProducts();

  const brands = getBrands();
  const strengths = getStrengths();

  // Filter products based on search and filters
  let filteredProducts = searchProducts(searchTerm);
  
  if (selectedBrand !== "all") {
    filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
  }
  
  if (selectedStrength !== "all") {
    filteredProducts = filteredProducts.filter(product => product.strength === selectedStrength);
  }

  // Sort products
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t("shop.title")}</h1>
          <p className="text-muted-foreground text-lg">
            {t("shop.subtitle")}
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("shop.search")}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder={t("shop.all_brands")} />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand === "all" ? t("shop.all_brands") : brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Strength Filter */}
              <Select value={selectedStrength} onValueChange={setSelectedStrength}>
                <SelectTrigger>
                  <SelectValue placeholder={t("shop.all_strengths")} />
                </SelectTrigger>
                <SelectContent>
                  {strengths.map((strength) => (
                    <SelectItem key={strength} value={strength}>
                      {strength === "all" ? t("shop.all_strengths") : strength}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={t("shop.sort_by")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t("shop.most_popular")}</SelectItem>
                  <SelectItem value="price-low">{t("shop.price_low")}</SelectItem>
                  <SelectItem value="price-high">{t("shop.price_high")}</SelectItem>
                  <SelectItem value="name">{t("shop.name_az")}</SelectItem>
                  <SelectItem value="rating">{t("shop.highest_rated")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {t("shop.showing")} {sortedProducts.length} {t("shop.of")} {products.length} {t("shop.products")}
          </p>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(product) => console.log("Added to cart:", product)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-xl font-semibold">{t("shop.no_products")}</h3>
              <p className="text-muted-foreground">
                {t("shop.no_products.desc")}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBrand("all");
                  setSelectedStrength("all");
                  setSortBy("popular");
                }}
              >
                {t("shop.clear_filters")}
              </Button>
            </div>
          </Card>
        )}

        {/* Load More Button (placeholder for pagination) */}
        {sortedProducts.length > 0 && sortedProducts.length >= 8 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              {t("shop.load_more")}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;