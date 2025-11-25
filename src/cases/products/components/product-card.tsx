import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProductDTO } from "../dtos/product.dto";
import { useCart } from "@/cases/cart/context/cart-context";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useFavorites, useToggleFavorite } from "@/cases/favorites/hooks/use-favorite";
import { FavoriteButton } from "@/cases/favorites/components/favorite-button";
import { useCanRateProduct, useProductReviews } from "@/cases/reviews/hooks/use-review";
import { RatingStars } from "@/cases/reviews/components/rating-stars";
import { AverageStars } from "@/cases/reviews/components/avarage-stars";

/**
 * Props do componente ProductCard
 */
interface ProductCardProps {
  product: ProductDTO;
}

/**
 * Componente de card de produto com informações completas.
 * Exibe nome, descrição, preço, categoria, avaliações e permite:
 * - Adicionar aos favoritos
 * - Adicionar ao carrinho
 * - Avaliar o produto (se aplicável)
 */
export function ProductCard({ product }: ProductCardProps) {
  // Hooks de dados do usuário e carrinho
  const { customer } = useCurrentCustomer();
  const { addToCart } = useCart();
  
  // Hooks de favoritos
  const { data: favs } = useFavorites(customer?.id!);
  const toggle = useToggleFavorite(customer?.id!);
  
  // Hooks de avaliações
  const { data: reviews } = useProductReviews(product.id!);
  const canRate = useCanRateProduct(product.id!);

  // Extrai IDs dos produtos favoritos para verificação
  const favoriteIds = favs?.map(f => f.product.id).filter((id): id is string => typeof id === "string") ?? [];
  
  // Calcula a média de estrelas das avaliações
  const average = reviews && reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length 
    : 0;

  return (
    <Card className="flex flex-col justify-between h-full hover:shadow-lg transition-all duration-200">
      <div>
        {/* Cabeçalho: nome do produto e botão de favorito */}
        <CardHeader>
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{product.name}</h2>

            <FavoriteButton 
              productId={product.id!}
              favorites={favoriteIds}
              toggle={(productId) => toggle.mutate(productId)}
            />
          </div>

          {/* Média de avaliações e contador */}
          <div className="flex items-center gap-2 mb-2">
            <AverageStars rating={average} />
            <span className="text-xs text-gray-500">
              {reviews?.length ?? 0} {reviews?.length === 1 ? 'avaliação' : 'avaliações'}
            </span>
          </div>
        </CardHeader>

        {/* Conteúdo: descrição, preço e categoria */}
        <CardContent>
          {/* Descrição do produto (se existir) */}
          {product.description ? 
            (<p className="text-sm text-gray-600 mb-2">{product.description}</p>) 
          : 
            (<div className="mb-6" />)
          }

          {/* Informações de preço e categoria */}
          <div className="flex flex-col">
            <span className="font-bold text-lg text-green-600 mb-2">
              R$ {product.price}
            </span>

            <span className="text-xs text-gray-500">
              Categoria: {product.category?.name ?? "Sem categoria"}
            </span>
          </div>

          {/* Sistema de avaliação (apenas se usuário pode avaliar) */}
          {canRate && (
            <div className="flex items-center gap-2 mt-6">
              <span className="text-xs font-medium text-gray-600">Avaliar:</span> 
              <RatingStars product={product} />
            </div>
          )}
        </CardContent>
      </div>

      {/* Rodapé: botão de adicionar ao carrinho */}
      <CardFooter className="mt-auto">
        <Button 
          className="w-full cursor-pointer" 
          onClick={() => addToCart({...product, quantity: 1})}
        >
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}