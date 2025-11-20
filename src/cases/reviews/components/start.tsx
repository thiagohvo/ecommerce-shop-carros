import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCreateReview } from "../hooks/use-review";

type RatingStarsProps = {
  product: ProductDTO;
  initialRating?: number; // permite mostrar avaliação inicial
};

export function RatingStars({ product, initialRating = 0 }: RatingStarsProps) {
  const [rating, setRating] = useState(initialRating);
  const createReview = useCreateReview();
  const { customer } = useCurrentCustomer();

  function handleRate(value: number) {
    setRating(value); // Preenche imediatamente as estrelas

    toast.success("Avaliação registrada!"); // Toast imediato

    if (!customer) return; // Se cliente não existir, não envia para backend

    // Envia avaliação para o backend (não bloqueia o usuário)
    createReview.mutate({
      stars: value,
      product,
      customer,
    });
  }

  return (
    <div className="flex gap-1 py-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          onClick={() => handleRate(n)}
          className={`w-6 h-6 cursor-pointer ${
            n <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

// Componente só de exibição (média) se precisar
type AverageStarsProps = {
  rating: number;
};

export function AverageStars({ rating }: AverageStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-5 h-5 ${
            n <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
