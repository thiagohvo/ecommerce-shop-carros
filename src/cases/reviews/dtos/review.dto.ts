import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

/**
 * Data Transfer Object para representação de avaliações de produtos.
 * Relaciona um cliente, um produto e a nota atribuída.
 */
export interface ReviewDTO {
    /**
     * Identificador único da avaliação (gerado pelo backend)
     */
    id: string;
    
    /**
     * Nota atribuída ao produto
     * Valor de 1 a 5 estrelas
     */
    stars: number;
    
    /**
     * Cliente que realizou a avaliação
     * Contém informações completas do avaliador
     */
    customer: CustomerDTO;
    
    /**
     * Produto que foi avaliado
     * Contém informações completas do produto
     */
    product: ProductDTO;
}