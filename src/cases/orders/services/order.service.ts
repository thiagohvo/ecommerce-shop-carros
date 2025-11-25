import { api } from "../../../lib/axios";
import type { OrderDTO } from "../dtos/order.dto";

/**
 * Endpoint base para operações com pedidos
 */
const _ENDPOINT = '/orders';

/**
 * Serviço responsável pela comunicação com a API de pedidos.
 * Gerencia criação e consulta de pedidos de clientes.
 */
export const OrderService = {

    /**
     * Busca todos os pedidos cadastrados.
     * Retorna lista completa com informações de cliente, status, valores e itens.
     * 
     * @returns Promise com array de pedidos
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<OrderDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },
    
    /**
     * Busca um pedido específico por ID.
     * 
     * @param id - Identificador único do pedido
     * @returns Promise com dados completos do pedido (cliente, status, itens, valores)
     * @throws Erro 404 se pedido não for encontrado
     */
    async getById(id: string): Promise<OrderDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },

    /**
     * Cria um novo pedido.
     * Primeiro passo ao finalizar compra no carrinho.
     * Após criar o pedido, os itens devem ser adicionados usando OrderItemService.
     * 
     * @param order - Dados do pedido (customer, status, total, shipping)
     * @returns Promise com pedido criado incluindo ID gerado
     * @throws Erro de validação ou falha ao criar
     */
    async create(order: OrderDTO): Promise<OrderDTO> {
        const result = await api.post(_ENDPOINT, order);
        return result.data;
    },
};