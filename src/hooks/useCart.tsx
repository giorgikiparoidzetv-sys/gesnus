import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
  strength?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart data based on auth state
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // Load from Supabase for authenticated users
        await loadCartFromDatabase();
        // Merge with localStorage cart if exists
        await mergeLocalStorageCart();
      } else {
        // Load from localStorage for unauthenticated users
        loadCartFromLocalStorage();
      }
    };
    
    loadCart();
  }, [user]);

  // Save to appropriate storage when items change
  useEffect(() => {
    if (user) {
      // Debounce database saves to avoid too many calls
      const timeoutId = setTimeout(() => {
        saveCartToDatabase();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      // Save to localStorage for unauthenticated users
      localStorage.setItem("snus-cart", JSON.stringify(items));
    }
  }, [items, user]);

  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("snus-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  };

  const loadCartFromDatabase = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Failed to load cart from database:", error);
        return;
      }

      const cartItems: CartItem[] = data?.map(item => ({
        id: item.product_id,
        name: item.name,
        price: parseFloat(item.price.toString()),
        image: item.image,
        quantity: item.quantity,
        brand: item.brand,
        strength: item.strength,
      })) || [];

      setItems(cartItems);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToDatabase = async () => {
    if (!user || loading) return;

    try {
      // Clear existing cart items for this user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert current cart items
      if (items.length > 0) {
        const cartData = items.map(item => ({
          user_id: user.id,
          product_id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          brand: item.brand,
          strength: item.strength,
        }));

        const { error } = await supabase
          .from('cart_items')
          .insert(cartData);

        if (error) {
          console.error("Failed to save cart to database:", error);
        }
      }
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const mergeLocalStorageCart = async () => {
    const savedCart = localStorage.getItem("snus-cart");
    if (!savedCart || !user) return;

    try {
      const localItems: CartItem[] = JSON.parse(savedCart);
      if (localItems.length === 0) return;

      // Merge local cart with current cart
      setItems(prevItems => {
        const merged = [...prevItems];
        
        localItems.forEach(localItem => {
          const existingIndex = merged.findIndex(item => item.id === localItem.id);
          if (existingIndex >= 0) {
            // Combine quantities for existing items
            merged[existingIndex].quantity += localItem.quantity;
          } else {
            // Add new items
            merged.push(localItem);
          }
        });
        
        return merged;
      });

      // Clear localStorage after successful merge
      localStorage.removeItem("snus-cart");
      
      toast({
        title: "Cart synced",
        description: "Your cart has been synced with your account",
      });
    } catch (error) {
      console.error("Failed to merge localStorage cart:", error);
    }
  };

  const addToCart = async (product: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Item updated",
          description: `${product.name} quantity increased in cart`,
        });
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = async (id: string) => {
    setItems((prevItems) => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast({
          title: "Item removed",
          description: `${item.name} has been removed from your cart`,
        });
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    setItems([]);
    
    if (user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.error("Error clearing cart from database:", error);
      }
    }
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};