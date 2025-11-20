import type { StateDTO } from "@/cases/states/dtos/state.dto";

export interface CityDTO {
    id?: string;
    name: string;
    ibge: string;
    state: StateDTO;
}