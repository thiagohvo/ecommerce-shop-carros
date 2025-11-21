import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "react-toastify";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

/**
 * Interface que estende ProductDTO adicionando a propriedade quantity
 * para controlar a quantidade de cada produto no carrinho
 */
interface CartProduct extends ProductDTO {
  quantity: number;
}

/**
 * Interface que define os dados e métodos disponíveis no contexto do carrinho
 */
interface CartContextData {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

// Cria o contexto do carrinho com valor inicial undefined
const CartContext = createContext<CartContextData | undefined>(undefined);

/**
 * Provider que gerencia o estado global do carrinho de compras.
 * Persiste os dados no localStorage para manter o carrinho entre sessões.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartProduct[]>([]);

  /**
   * Carrega o carrinho do localStorage quando o componente é montado
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar carrinho:", err);
    }
  }, []);

  /**
   * Sincroniza o carrinho com o localStorage sempre que houver alterações
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /**
   * Adiciona um produto ao carrinho.
   * Verifica se o produto já existe para evitar duplicatas.
   */
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

  /**
   * Remove um produto do carrinho pelo ID.
   * Exibe notificação de erro se o produto não for encontrado.
   */
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

  /**
   * Remove todos os produtos do carrinho
   */
  function clearCart() {
    setCart([]);
  }

  /**
   * Incrementa a quantidade de um produto específico no carrinho
   */
  function increaseQuantity(productId: string) {
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId 
          ? { ...p, quantity: p.quantity + 1 } 
          : p
      )
    );
  }

  /**
   * Decrementa a quantidade de um produto específico no carrinho.
   * Mantém a quantidade mínima de 1 unidade.
   */
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
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        increaseQuantity, 
        decreaseQuantity 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook personalizado para acessar o contexto do carrinho.
 * Lança um erro se usado fora do CartProvider.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  
  return context;
}