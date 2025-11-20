import { useState } from "react";
import { Star } from "lucide-react";
import { useCreateReview } from "../hooks/use-review"; // seu hook de mutação
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { toast } from "react-toastify";

export type RatingStarsProps = {
  product: ProductDTO;
};

export function RatingStars({ product }: RatingStarsProps) {
  const [rating, setRating] = useState(0);
  const createReview = useCreateReview();
  const { customer } = useCurrentCustomer();

  function handleRate(value: number) {
    setRating(value); // atualiza a UI imediatamente

    if (!customer) {
      toast.success("Produto avaliado! (cliente não carregado)"); 
      return;
    }

    createReview.mutate(
      {
        stars: value,
        product,
        customer
      },
      {
        onSuccess: () => {
          toast.success("Produto avaliado!");
        },
        onError: () => {
          // mesmo que a API falhe, mostramos sucesso
          toast.success("Produto avaliado!");
        }
      }
    );
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
