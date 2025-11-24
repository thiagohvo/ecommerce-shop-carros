/**
 * Data Transfer Object para representação de estados (UF).
 * Utilizado na comunicação entre frontend e backend.
 */
export interface StateDTO {
    /**
     * Identificador único do estado (gerado pelo backend)
     * Opcional ao criar novo estado
     */
    id?: string;
    
    /**
     * Nome completo do estado
     * Exemplo: "Paraná", "São Paulo"
     */
    name: string;
    
    /**
     * Código IBGE do estado
     * Identificador único nacional fornecido pelo Instituto Brasileiro de Geografia e Estatística
     */
    ibge: string;
    
    /**
     * Sigla do estado (UF)
     * Exemplo: "PR", "SP", "RJ"
     */
    acronym: string;
}