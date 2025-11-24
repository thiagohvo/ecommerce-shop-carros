import type { StateDTO } from "@/cases/states/dtos/state.dto";

/**
 * Data Transfer Object para representação de cidades.
 * Utilizado na comunicação entre frontend e backend.
 */
export interface CityDTO {
    /**
     * Identificador único da cidade (gerado pelo backend)
     * Opcional ao criar nova cidade
     */
    id?: string;
    
    /**
     * Nome da cidade
     */
    name: string;
    
    /**
     * Código IBGE da cidade
     * Identificador único nacional fornecido pelo Instituto Brasileiro de Geografia e Estatística
     */
    ibge: string;
    
    /**
     * Estado ao qual a cidade pertence
     * Relacionamento com StateDTO
     */
    state: StateDTO;
}