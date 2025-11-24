import { api } from "../../../lib/axios";
import type { CityDTO } from "../dtos/city.dto";

/**
 * Endpoint base para operações com cidades
 */
const _ENDPOINT = "/cities";

/**
 * Serviço responsável pela comunicação com a API de cidades.
 * Fornece métodos para buscar cidades e seus relacionamentos com estados.
 */
export const CityService = {

    /**
     * Busca todas as cidades disponíveis.
     * Retorna cidades com seus estados associados.
     * 
     * @returns Promise com array de cidades (incluindo dados do estado)
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<CityDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    /**
     * Busca uma cidade específica por ID.
     * 
     * @param id - Identificador único da cidade
     * @returns Promise com dados da cidade e estado associado
     * @throws Erro 404 se cidade não for encontrada
     */
    async getById(id: string): Promise<CityDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    }
};