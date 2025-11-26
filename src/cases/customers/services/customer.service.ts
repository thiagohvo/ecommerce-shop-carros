import { api } from "../../../lib/axios";
import type { CustomerDTO } from "../dtos/customer.dto";

/**
 * Endpoint base para operações com clientes
 */
const _ENDPOINT = "/customers";

/**
 * Serviço responsável pela comunicação com a API de clientes.
 * Gerencia operações CRUD (Create, Read, Update) de clientes do sistema.
 */
export const CustomerService = {

    /**
     * Busca todos os clientes cadastrados.
     * Retorna lista completa com informações de endereço e cidade.
     * 
     * @returns Promise com array de clientes
     * @throws Erro de rede ou resposta inválida da API
     */
    async list(): Promise<CustomerDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    /**
     * Busca um cliente específico por ID.
     * 
     * @param id - Identificador único do cliente
     * @returns Promise com dados completos do cliente (nome, endereço, cidade)
     * @throws Erro 404 se cliente não for encontrado
     */
    async getById(id: string): Promise<CustomerDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },

    /**
     * Cria um novo cliente.
     * Utilizado durante o processo de registro de novos usuários.
     * 
     * @param customer - Dados do cliente (name, address, zipcode, city, userId)
     * @returns Promise com cliente criado incluindo ID gerado
     * @throws Erro de validação ou falha ao criar
     */
    async create(customer: CustomerDTO): Promise<CustomerDTO> {
        const result = await api.post(_ENDPOINT, customer);
        return result.data;
    },

    /**
     * Atualiza dados de um cliente existente.
     * Utilizado para editar informações de endereço na página de conta.
     * 
     * @param id - Identificador único do cliente
     * @param customer - Dados atualizados do cliente
     * @returns Promise com cliente atualizado
     * @throws Erro 404 se cliente não for encontrado ou erro de validação
     */
    async update(id: string, customer: CustomerDTO): Promise<CustomerDTO> {
        const result = await api.put(`${_ENDPOINT}/${id}`, customer);
        return result.data;
    }
};