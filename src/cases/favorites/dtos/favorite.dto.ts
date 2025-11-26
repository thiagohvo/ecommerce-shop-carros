import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

/**
 * Data Transfer Object para representação de produtos favoritos.
 * Relaciona um cliente a um produto marcado como favorito.
 */
export interface FavoriteDTO {
    /**
     * Identificador único do favorito (gerado pelo backend)
     */
    id: string;
    
    /**
     * Cliente que favoritou o produto
     * Contém informações completas do cliente
     */
    customer: CustomerDTO;
    
    /**
     * Produto marcado como favorito
     * Contém informações completas do produto (nome, preço, categoria, etc)
     */
    product: ProductDTO;
}