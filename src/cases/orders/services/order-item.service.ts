import { api } from "../../../lib/axios";
import type { OrderItemDTO } from "../dtos/order-item.dto";

/**
 * Endpoint base para operações com itens de pedidos
 */
const _ENDPOINT = '/order-items';

/**
 * Serviço responsável pela comunicação com a API de itens de pedidos.
 * Gerencia a associação entre produtos e pedidos com quantidade e valor.
 */
export const OrderItemService = {

    /**
     * Busca todos os itens de pedidos.
     * Retorna lista completa com relacionamentos de produto e pedido.
     * 
     * @returns Promise com array de itens de pedidos
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<OrderItemDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },
    
    /**
     * Busca um item de pedido específico por ID.
     * 
     * @param id - Identificador único do item de pedido
     * @returns Promise com dados do item (produto, pedido, quantidade, valor)
     * @throws Erro 404 se item não for encontrado
     */
    async getById(id: string): Promise<OrderItemDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },

    /**
     * Cria um novo item de pedido.
     * Utilizado ao finalizar compra para associar produtos ao pedido.
     * 
     * @param orderItem - Dados do item (product, order, quantity, value)
     * @returns Promise com item criado incluindo ID gerado
     * @throws Erro de validação ou falha ao criar
     */
    async create(orderItem: OrderItemDTO): Promise<OrderItemDTO> {
        const result = await api.post(_ENDPOINT, orderItem);
        return result.data;
    },
};