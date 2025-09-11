import { useState } from "react";
import { Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShopPage = () => {
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
          <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-muted-foreground text-lg">
            Discover our complete collection of premium snus products
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
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand === "all" ? "All Brands" : brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Strength Filter */}
              <Select value={selectedStrength} onValueChange={setSelectedStrength}>
                <SelectTrigger>
                  <SelectValue placeholder="All Strengths" />
                </SelectTrigger>
                <SelectContent>
                  {strengths.map((strength) => (
                    <SelectItem key={strength} value={strength}>
                      {strength === "all" ? "All Strengths" : strength}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {products.length} products
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
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
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
                Clear Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Load More Button (placeholder for pagination) */}
        {sortedProducts.length > 0 && sortedProducts.length >= 8 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;