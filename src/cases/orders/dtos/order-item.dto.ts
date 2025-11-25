import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import type { OrderDTO } from "./order.dto";

/**
 * Data Transfer Object para representação de itens de pedido.
 * Relaciona um produto a um pedido específico com quantidade e valor.
 */
export interface OrderItemDTO {
    /**
     * Identificador único do item de pedido (gerado pelo backend)
     * Opcional ao criar novo item
     */
    id?: string;
    
    /**
     * Produto associado ao item
     * Pode ser o objeto ProductDTO completo ou apenas o ID (string)
     */
    product: ProductDTO | string;
    
    /**
     * Pedido ao qual este item pertence
     * Pode ser o objeto OrderDTO completo ou apenas o ID (string)
     */
    order: OrderDTO | string;
    
    /**
     * Quantidade do produto no pedido
     */
    quantity: number;
    
    /**
     * Valor unitário do produto no momento da compra
     * Armazenado para manter histórico, mesmo que o preço do produto mude
     */
    value: number;
}