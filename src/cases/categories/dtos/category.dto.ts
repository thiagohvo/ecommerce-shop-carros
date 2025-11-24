/**
 * Data Transfer Object para representação de categorias de produtos.
 * Utilizado na comunicação entre frontend e backend.
 */
export interface CategoryDTO {
    /**
     * Identificador único da categoria (gerado pelo backend)
     * Opcional ao criar nova categoria
     */
    id?: string;
    
    /**
     * Nome da categoria
     */
    name: string;
}