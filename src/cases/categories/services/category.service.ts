import { api } from "../../../lib/axios";
import type { CategoryDTO } from "../dtos/category.dto";

/**
 * Endpoint base para operações com categorias
 */
const _ENDPOINT = "/categories";

/**
 * Serviço responsável pela comunicação com a API de categorias.
 * Fornece métodos para buscar e manipular categorias de produtos.
 */
export const CategoryService = {

    /**
     * Busca todas as categorias disponíveis.
     * 
     * @returns Promise com array de categorias
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<CategoryDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    /**
     * Busca uma categoria específica por ID.
     * 
     * @param id - Identificador único da categoria
     * @returns Promise com dados da categoria
     * @throws Erro 404 se categoria não for encontrada
     */
    async getById(id: string): Promise<CategoryDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    }
};