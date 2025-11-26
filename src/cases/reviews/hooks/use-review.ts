import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ReviewService } from "../services/review.service";
import type { ReviewDTO } from "../dtos/review.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useOrders } from "@/cases/orders/hooks/use-order";

/**
 * Hook para buscar todas as avaliações cadastradas.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de todas as avaliações, loading e erro
 * 
 * Exemplo:
 * const { data: reviews, isLoading } = useReviews();
 */
export function useReviews() {
    return useQuery<ReviewDTO[]>({
        queryKey: ["reviews"],
        queryFn: ReviewService.list
    });
}

/**
 * Hook para buscar avaliações de um produto específico.
 * A query só é executada se o productId for fornecido.
 * 
 * @param productId - Identificador único do produto
 * @returns Query com lista de avaliações do produto, loading e erro
 * 
 * Exemplo:
 * const { data: reviews, isLoading } = useProductReviews("123");
 */
export function useProductReviews(productId: string) {
    return useQuery<ReviewDTO[]>({
        queryKey: ["reviews", productId],
        queryFn: () => ReviewService.listByProduct(productId),
        enabled: !!productId // Só executa a query se o ID existir
    });
}

/**
 * Hook para criar uma nova avaliação de produto.
 * Exibe notificações de sucesso ou erro automaticamente.
 * 
 * @returns Mutation para criar avaliação
 * 
 * Exemplo:
 * const createReview = useCreateReview();
 * createReview.mutate({ stars, customer, product });
 */
export function useCreateReview() {
    return useMutation<ReviewDTO, Error, Omit<ReviewDTO, "id">>({
        mutationFn: (review: Omit<ReviewDTO, "id">) => ReviewService.create(review),
        onSuccess: () => {
            toast.success('Produto avaliado com sucesso!');
        }, 
        onError: (error) => {
            toast.error(`Erro ao avaliar produto: ${error.message}`);
        }
    });
}

/**
 * Hook que verifica se o usuário atual pode avaliar um produto específico.
 * Regra: usuário só pode avaliar produtos que já comprou (presente em algum pedido).
 * 
 * @param productId - Identificador único do produto
 * @returns true se o usuário comprou o produto, false caso contrário
 * 
 * Exemplo:
 * const canRate = useCanRateProduct("123");
 * {canRate && <RatingStars product={product} />}
 */
export function useCanRateProduct(productId: string) {
    const { customer } = useCurrentCustomer();
    const { data: orders } = useOrders();

    // Se não houver cliente ou pedidos, não pode avaliar
    if (!customer || !orders) return false;

    /**
     * Verifica se existe algum pedido do cliente que contenha o produto
     * Lida com customer e product podendo ser string (ID) ou objeto completo
     */
    return orders.some(order => {
        // Extrai ID do customer (pode ser string ou objeto)
        const orderCustomerId = typeof order.customer === "string" 
            ? order.customer 
            : order.customer.id;

        // Verifica se o pedido é do cliente atual e contém o produto
        return (
            orderCustomerId === customer.id && 
            order.items!.some(item => {
                // Extrai ID do produto (pode ser string ou objeto)
                const itemProductId = typeof item.product === "string" 
                    ? item.product 
                    : item.product.id;
                
                return itemProductId === productId;
            })
        );
    });
}