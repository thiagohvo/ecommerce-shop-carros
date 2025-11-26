import { api } from "../../../lib/axios";
import type { ReviewDTO } from "../dtos/review.dto";

/**
 * Endpoint base para operações com avaliações
 */
const _ENDPOINT = '/reviews';

/**
 * Serviço responsável pela comunicação com a API de avaliações de produtos.
 * Gerencia criação e consulta de avaliações feitas por clientes.
 */
export const ReviewService = {

    /**
     * Busca todas as avaliações cadastradas.
     * Retorna lista completa com informações de cliente, produto e nota.
     * 
     * @returns Promise com array de avaliações
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<ReviewDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    /**
     * Busca todas as avaliações de um produto específico.
     * Utilizado para calcular média de estrelas e exibir contador de avaliações.
     * 
     * @param productId - Identificador único do produto
     * @returns Promise com array de avaliações do produto
     * @throws Erro de rede ou resposta inválida da API
     */
    async listByProduct(productId: string) {
        const result = await api.get(`${_ENDPOINT}?productId=${productId}`);
        return result.data;
    },

    /**
     * Cria uma nova avaliação de produto.
     * Registra a nota (1 a 5 estrelas) atribuída por um cliente a um produto.
     * 
     * @param review - Dados da avaliação (stars, customer, product)
     * @returns Promise com avaliação criada incluindo ID gerado
     * @throws Erro de validação ou falha ao criar
     */
    async create(review: Omit<ReviewDTO, "id">): Promise<ReviewDTO> {
        const result = await api.post(_ENDPOINT, review);
        return result.data;
    }
};