import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderService } from "../services/order.service";
import type { OrderDTO } from "../dtos/order.dto";

/**
 * Hook para buscar todos os pedidos.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de pedidos (cliente, status, total, itens), loading e erro
 * 
 * Exemplo:
 * const { data: orders, isLoading } = useOrders();
 */
export function useOrders() {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders'],
        queryFn: OrderService.list
    });
}

/**
 * Hook para buscar um pedido específico por ID.
 * A query só é executada se o ID for fornecido (enabled: !!id).
 * 
 * @param id - Identificador único do pedido
 * @returns Query com dados completos do pedido, loading e erro
 * 
 * Exemplo:
 * const { data: order, isLoading } = useOrder("123");
 */
export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['orders', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id // Só executa a query se o ID existir
    });
}

/**
 * Hook para criar um novo pedido.
 * Utilizado ao finalizar compra no carrinho para gerar o pedido principal.
 * Após criar o pedido, os itens devem ser adicionados usando useCreateOrderItem.
 * 
 * @returns Mutation para criar pedido
 * 
 * Exemplo:
 * const createOrder = useCreateOrder();
 * const order = await createOrder.mutateAsync({ customer, status, total, shipping });
 */
export function useCreateOrder() {
    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order: Omit<OrderDTO, 'id'>) => OrderService.create(order)
    });
}