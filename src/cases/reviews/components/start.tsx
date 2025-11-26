import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCreateReview } from "../hooks/use-review";

/**
 * Props do componente RatingStars
 */
type RatingStarsProps = {
  product: ProductDTO;
  /**
   * Avaliação inicial a ser exibida (opcional)
   * Útil para mostrar avaliação já existente
   */
  initialRating?: number;
};

/**
 * Componente interativo de avaliação por estrelas.
 * Permite que o usuário avalie um produto clicando nas estrelas (1 a 5).
 * Usa estratégia de UX otimista: atualiza interface imediatamente e envia para API em background.
 */
export function RatingStars({ product, initialRating = 0 }: RatingStarsProps) {
  // Estado local da avaliação (1 a 5 estrelas)
  const [rating, setRating] = useState(initialRating);
  
  // Hooks de API
  const createReview = useCreateReview();
  const { customer } = useCurrentCustomer();

  /**
   * Manipula o clique em uma estrela.
   * Estratégia: atualiza UI + mostra toast imediatamente, envia para API depois.
   * 
   * @param value - Número de estrelas selecionadas (1 a 5)
   */
  function handleRate(value: number) {
    // Atualiza a UI imediatamente para feedback visual instantâneo
    setRating(value);

    // Exibe notificação de sucesso imediatamente (UX otimista)
    toast.success("Avaliação registrada!");

    
    if (!customer) return;

    createReview.mutate({
      stars: value,
      product,
      customer,
    });
  }

  return (
    <div className="flex gap-1 py-2">
      {/* Renderiza 5 estrelas interativas */}
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          onClick={() => handleRate(n)}
          className={`w-6 h-6 cursor-pointer ${
            // Preenche estrelas até a nota selecionada
            n <= rating 
              ? "fill-yellow-500 text-yellow-500" // Estrela selecionada
              : "text-gray-400" // Estrela não selecionada
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Props do componente AverageStars
 */
type AverageStarsProps = {
  /**
   * Avaliação média a ser exibida
   * Valor de 0 a 5 (pode ser decimal, ex: 4.5)
   */
  rating: number;
};


 
export function AverageStars({ rating }: AverageStarsProps) {
  return (
    <div className="flex gap-1">
      {}
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-5 h-5 ${
        
            n <= rating 
              ? "fill-yellow-500 text-yellow-500" // Estrela preenchida
              : "text-gray-300" // Estrela vazia
          }`}
        />
      ))}
    </div>
  );
}