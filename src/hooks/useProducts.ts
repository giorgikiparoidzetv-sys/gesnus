import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from './useTranslation';

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  brand: string;
  strength: string;
  nicotineMg: number;
  flavorTags: string[];
  price: number;
  salePrice?: number;
  originalPrice?: number;
  currency: string;
  stock: number;
  sku: string;
  image: string;
  featured: boolean;
  category: string;
  rating: number;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useTranslation();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      // Transform database products to match our Product interface
      const transformedProducts: Product[] = (data || []).map(item => ({
        id: item.id,
        slug: item.slug,
        name: language === 'ka' ? item.name_ka : item.name_en,
        shortDescription: language === 'ka' ? item.short_description_ka : item.short_description_en,
        longDescription: language === 'ka' ? item.long_description_ka : item.long_description_en,
        brand: item.brand,
        strength: item.strength,
        nicotineMg: Number(item.nicotine_mg),
        flavorTags: item.flavor_tags || [],
        price: Number(item.price),
        salePrice: item.sale_price ? Number(item.sale_price) : undefined,
        originalPrice: item.sale_price ? Number(item.price) : undefined,
        currency: item.currency,
        stock: item.stock,
        sku: item.sku,
        image: item.image_url,
        featured: item.featured,
        category: item.category,
        rating: Number(item.rating),
        seoTitle: item.seo_title,
        seoDescription: item.seo_description,
        ogImage: item.og_image,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [language]);

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getProductsByBrand = (brand: string) => {
    return products.filter(product => product.brand === brand);
  };

  const getProductsByStrength = (strength: string) => {
    return products.filter(product => product.strength === strength);
  };

  const searchProducts = (query: string) => {
    if (!query.trim()) return products;
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.shortDescription.toLowerCase().includes(lowerQuery) ||
      product.flavorTags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const sortProducts = (products: Product[], sortBy: string) => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popular':
      default:
        return sorted.sort((a, b) => b.rating - a.rating);
    }
  };

  const getBrands = () => {
    const brands = [...new Set(products.map(product => product.brand))].sort();
    return ['all', ...brands];
  };

  const getStrengths = () => {
    const strengths = [...new Set(products.map(product => product.strength))].sort();
    return ['all', ...strengths];
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    getFeaturedProducts,
    getProductsByBrand,
    getProductsByStrength,
    searchProducts,
    sortProducts,
    getBrands,
    getStrengths,
  };
};