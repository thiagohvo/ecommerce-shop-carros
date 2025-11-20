import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface ReviewDTO {
    id: string;
    stars: number;
    customer: CustomerDTO;
    product: ProductDTO;
}
