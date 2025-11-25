import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderItemService } from "../services/order-item.service";
import type { OrderItemDTO } from "../dtos/order-item.dto";

/**
 * Hook para buscar todos os itens de pedidos.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de itens de pedidos, loading e erro
 * 
 * Exemplo:
 * const { data: orderItems, isLoading } = useOrderItems();
 */
export function useOrderItems() {
    return useQuery<OrderItemDTO[]>({
        queryKey: ['order-items'],
        queryFn: OrderItemService.list
    });
}

/**
 * Hook para buscar um item de pedido específico por ID.
 * A query só é executada se o ID for fornecido (enabled: !!id).
 * 
 * @param id - Identificador único do item de pedido
 * @returns Query com dados do item (produto, pedido, quantidade, valor), loading e erro
 * 
 * Exemplo:
 * const { data: orderItem, isLoading } = useOrderItem("123");
 */
export function useOrderItem(id: string) {
    return useQuery<OrderItemDTO>({
        queryKey: ['order-items', id],
        queryFn: () => OrderItemService.getById(id),
        enabled: !!id // Só executa a query se o ID existir
    });
}

/**
 * Hook para criar um novo item de pedido.
 * Utilizado ao finalizar compra para adicionar produtos ao pedido.
 * 
 * @returns Mutation para criar item de pedido
 * 
 * Exemplo:
 * const createOrderItem = useCreateOrderItem();
 * createOrderItem.mutate({ product, order, quantity, value });
 */
export function useCreateOrderItem() {
    return useMutation<OrderItemDTO, Error, Omit<OrderItemDTO, 'id'>>({
        mutationFn: (orderItem: Omit<OrderItemDTO, 'id'>) => OrderItemService.create(orderItem)
    });
}