import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderItemService } from "../services/order-item.service";
import type { OrderItemDTO } from "../dtos/order-item.dto";

export function useOrderItems() {
    return useQuery<OrderItemDTO[]>({
        queryKey: ['order-items'],
        queryFn: OrderItemService.list
    });
}

export function useOrderItem(id: string) {
    return useQuery<OrderItemDTO>({
        queryKey: ['order-items', id],
        queryFn: () => OrderItemService.getById(id),
        enabled: !!id
    });
}

export function useCreateOrderItem() {
    return useMutation<OrderItemDTO, Error, Omit<OrderItemDTO, 'id'>>({
        mutationFn: (orderItem: Omit<OrderItemDTO, 'id'>) => OrderItemService.create(orderItem)
    });
}