import { useState } from "react";
import { Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import generalWhite from "@/assets/general-white.jpg";
import siberia from "@/assets/siberia.jpg";
import gotebergRape from "@/assets/goteborg-rape.jpg";
import odens from "@/assets/odens.jpg";
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

  // Sample products data - expanded
  const allProducts = [
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
    },
    {
      id: 5,
      name: "Skruf Super White",
      price: 5.99,
      rating: 5,
      image: generalWhite,
      brand: "Skruf",
      strength: "Strong"
    },
    {
      id: 6,
      name: "Thunder Frosted",
      price: 4.29,
      rating: 4,
      image: siberia,
      brand: "Thunder",
      strength: "Regular"
    },
    {
      id: 7,
      name: "General Mini Mint",
      price: 4.49,
      rating: 4,
      image: generalWhite,
      brand: "General",
      strength: "Light"
    },
    {
      id: 8,
      name: "Odens Double Mint",
      price: 4.19,
      originalPrice: 5.19,
      rating: 4,
      image: odens,
      brand: "Odens",
      strength: "Strong"
    }
  ];

  const brands = ["all", "General", "Siberia", "Göteborg Rapé", "Odens", "Skruf", "Thunder"];
  const strengths = ["all", "Light", "Regular", "Strong", "Extra Strong"];

  // Filter products based on search and filters
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const matchesStrength = selectedStrength === "all" || product.strength === selectedStrength;
    
    return matchesSearch && matchesBrand && matchesStrength;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      default: // popular
        return b.rating - a.rating;
    }
  });

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
            Showing {sortedProducts.length} of {allProducts.length} products
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