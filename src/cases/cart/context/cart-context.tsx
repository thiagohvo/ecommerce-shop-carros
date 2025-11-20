import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { toast } from "react-toastify";

interface CartProduct extends ProductDTO {
  quantity: number;
}

interface CartContextData {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (err) {
      console.error("Erro ao carregar carrinho:", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: CartProduct) {
    setCart((prev) => {
      const alreadyExists = prev.some((p) => p.id === product.id);

      if (alreadyExists) {
        toast.info("Produto já está no carrinho!");
        return prev;
      }

      toast.success(`${product.name} adicionado ao carrinho!`);
      return [...prev, product];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => {
      const product = prev.find((p) => p.id === productId);

      if (!product) {
        toast.error("Produto não encontrado!");
        return prev;
      }

      toast.info(`${product.name} removido do carrinho.`);
      return prev.filter((p) => p.id !== productId);
    });
  }

  function clearCart() {
    setCart([]);
  }

  function increaseQuantity(productId: string) {
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  }

  function decreaseQuantity(productId: string) {
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
