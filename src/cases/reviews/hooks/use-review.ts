import { useMutation, useQuery } from "@tanstack/react-query";
import { ReviewService } from "../services/review.service";
import type { ReviewDTO } from "../dtos/review.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useOrders } from "@/cases/orders/hooks/use-order";
import { toast } from "react-toastify";

export function useReviews() {
    return useQuery<ReviewDTO[]>({
        queryKey: ["reviews"],
        queryFn: ReviewService.list
    });
}

export function useProductReviews(productId: string) {
    return useQuery<ReviewDTO[]>({
        queryKey: ["reviews", productId],
        queryFn: () => ReviewService.listByProduct(productId),
        enabled: !!productId
    });
}

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


export function useCanRateProduct(productId: string) {
    const { customer } = useCurrentCustomer();
    const { data: orders } = useOrders();

    if (!customer || !orders) return false;

    return orders.some(order => {
        const orderCustomerId = typeof order.customer === "string" ? order.customer : order.customer.id;

        return (
            orderCustomerId === customer.id && 
            order.items!.some(item => {
                const itemProductId = typeof item.product === "string" ? item.product : item.product.id;
                return itemProductId === productId;
            })
        );
    });
}
