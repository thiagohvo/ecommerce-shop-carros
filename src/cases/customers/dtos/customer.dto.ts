import type { CityDTO } from "@/cases/cities/dtos/city.dto";

/**
 * Data Transfer Object para representação de clientes.
 * Contém informações pessoais e de endereço do cliente.
 * Relacionado com um usuário autenticado via userId.
 */
export interface CustomerDTO {
    /**
     * Identificador único do cliente (gerado pelo backend)
     * Opcional ao criar novo cliente
     */
    id?: string;
    
    /**
     * Nome completo do cliente
     */
    name: string;
    
    /**
     * Endereço completo (rua, número, complemento)
     */
    address: string;
    
    /**
     * Código postal (CEP)
     * Formato: 00000-000
     */
    zipcode: string;
    
    /**
     * Cidade do cliente
     * Inclui informações do estado associado
     */
    city: CityDTO;
    
    /**
     * ID do usuário autenticado (Supabase Auth)
     * Vincula o registro de cliente ao usuário do sistema de autenticação
     */
    userId: string;
}