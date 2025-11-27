import { useState } from "react";
import { useToggleFavorite } from "@/cases/favorites/hooks/use-favorite";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";

/**
 * Props do componente FavoriteButton
 */
interface FavoriteButtonProps {
  /**
   * Identificador único do produto a ser favoritado
   */
  productId: string;
}


export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { customer } = useCurrentCustomer();
  const toggleFavorite = useToggleFavorite();

 
  const [isFavorite, setIsFavorite] = useState(false);

 
  const handleClick = () => {
   
    setIsFavorite(true);

    
    if (customer?.id) {
      toggleFavorite.mutate(productId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-white p-2 rounded ${
        isFavorite 
          ? "bg-red-500"    // Favoritado (vermelho)
          : "bg-gray-300"   // Não favoritado (cinza)
      }`}
    >
      ❤️
    </button>
  );
}