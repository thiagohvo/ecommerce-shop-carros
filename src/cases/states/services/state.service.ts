import { api } from "../../../lib/axios";
import type { StateDTO } from "../dtos/state.dto";

/**
 * Endpoint base para operações com estados
 */
const _ENDPOINT = "/states";

/**
 * Serviço responsável pela comunicação com a API de estados (UF).
 * Fornece métodos para buscar estados brasileiros e suas informações.
 */
export const StateService = {

    /**
     * Busca todos os estados (UF) disponíveis.
     * Retorna lista completa de estados brasileiros com nome, sigla e código IBGE.
     * 
     * @returns Promise com array de estados
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<StateDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    /**
     * Busca um estado (UF) específico por ID.
     * 
     * @param id - Identificador único do estado
     * @returns Promise com dados do estado (nome, sigla, código IBGE)
     * @throws Erro 404 se estado não for encontrado
     */
    async getById(id: string): Promise<StateDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    }
};