import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface FavoriteDTO {
    id: string;
    customer: CustomerDTO;
    product: ProductDTO;
}
