import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProductDTO } from "../dtos/product.dto";
import { useCart } from "@/cases/cart/context/cart-context";
import { FavoriteButton } from "@/cases/favorites/components/favorite-button";
import { useFavorites, useToggleFavorite } from "@/cases/favorites/hooks/use-favorite";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCanRateProduct, useProductReviews } from "@/cases/reviews/hooks/use-review";
import { RatingStars } from "@/cases/reviews/components/rating-stars";
import { AverageStars } from "@/cases/reviews/components/avarage-stars";

interface ProductCardProps {
  product: ProductDTO;
}

export function ProductCard({ product }: ProductCardProps) {
  const { customer } = useCurrentCustomer();
  const { addToCart } = useCart();
  const { data: favs } = useFavorites(customer?.id!);
  const toggle = useToggleFavorite(customer?.id!);
  const { data: reviews } = useProductReviews(product.id!);
  const canRate = useCanRateProduct(product.id!);

  const favoriteIds = favs?.map(f => f.product.id).filter((id): id is string => typeof id === "string") ?? [];
  const average = reviews && reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length : 0;

  return (
    <Card className="flex flex-col justify-between h-full hover:shadow-lg transition-all duration-200">
      <div>
          <CardHeader>
          <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">{product.name}</h2>

              <FavoriteButton productId={product.id!}
                              favorites={favoriteIds}
                              toggle={(productId) => toggle.mutate(productId)}/>
          </div>

          <div className="flex items-center gap-2 mb-2">
              <AverageStars rating={average} />
              <span className="text-xs text-gray-500">
                {reviews?.length ?? 0} {reviews?.length === 1 ? 'avaliação' : 'avaliações'}
              </span>
          </div>
        </CardHeader>

        <CardContent>
          {
            product.description ? 
              (<p className="text-sm text-gray-600 mb-2">{product.description}</p>) 
            : 
              (<div className="mb-6" />)
          }

          <div className="flex flex-col">
            <span className="font-bold text-lg text-green-600 mb-2">
              R$ {product.price}
            </span>

            <span className="text-xs text-gray-500">
              Categoria: {product.category?.name ?? "Sem categoria"}
            </span>
          </div>

          {
            canRate && 
            (
              <div className="flex items-center gap-2 mt-6">
                <span className="text-xs font-medium text-gray-600">Avaliar:</span> 
                <RatingStars product={product} />
              </div>
            )
          }
        </CardContent>
      </div>

      <CardFooter className="mt-auto">
        <Button className="w-full cursor-pointer" onClick={() => addToCart({...product, quantity: 1})}>
          Adicionar ao carrinho
        </Button>
      </CardFooter>
    </Card>
  );
}
