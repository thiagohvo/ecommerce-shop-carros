import type { CityDTO } from "@/cases/cities/dtos/city.dto";

export interface CustomerDTO {
    id?: string;
    name: string;
    address: string;
    zipcode: string;
    city: CityDTO;
    userId: string
}