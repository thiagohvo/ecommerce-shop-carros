import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import type { OrderDTO } from "./order.dto";

export interface OrderItemDTO {
    id?: string;
    product: ProductDTO | string;
    order: OrderDTO | string;
    quantity: number;
    value: number;
}