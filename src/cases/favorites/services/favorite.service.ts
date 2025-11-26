import { api } from "../../../lib/axios";
import type { FavoriteDTO } from "../dtos/favorite.dto";

/**
 * Endpoint base para operações com favoritos
 */
const _ENDPOINT = '/favorites';

/**
 * Serviço responsável pela comunicação com a API de produtos favoritos.
 * Gerencia listagem e toggle (adicionar/remover) de favoritos.
 */
export const FavoriteService = {
    /**
     * Busca todos os favoritos de um cliente específico.
     * Retorna lista de relacionamentos entre cliente e produtos favoritos.
     * 
     * @param customerId - Identificador único do cliente
     * @returns Promise com array de favoritos do cliente
     * @throws Erro se customerId for inválido ou falha na requisição
     */
    async list(customerId: string): Promise<FavoriteDTO[]> {
        // Valida parâmetro obrigatório
        if (!customerId) throw new Error("customerId inválido");

        const result = await api.get(_ENDPOINT, {
            params: { customerId }
        });
        return result.data;
    },

    /**
     * Alterna o status de favorito de um produto (adiciona se não existe, remove se existe).
     * Operação de toggle permite usar o mesmo endpoint para adicionar e remover.
     * 
     * @param customerId - Identificador único do cliente
     * @param productId - Identificador único do produto
     * @returns Promise<void> - Não retorna dados, apenas confirma operação
     * @throws Erro se parâmetros forem inválidos ou falha na requisição
     */
    async toggle(customerId: string, productId: string): Promise<void> {
        // Valida parâmetros obrigatórios
        if (!customerId || !productId) {
            throw new Error("customerId ou productId inválido");
        }

        try {
            await api.post(_ENDPOINT, {
                customerId,
                productId
            });
        } catch (err) {
            console.error("Erro ao favoritar produto:", err);
            throw err; // Propaga erro para ser tratado pelo hook
        }
    }
};