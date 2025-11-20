import { useQuery } from "@tanstack/react-query";
import type { CityDTO } from "../dtos/city.dto";
import { CityService } from "../services/city.service";

export function useCities() {
    return useQuery<CityDTO[]>({
        queryKey: ["cities"],
        queryFn: CityService.list
    });
}

export function useCity(id: string) {
    return useQuery<CityDTO>({
        queryKey: ["cities", id],
        queryFn: () => CityService.getById(id),
        enabled: !!id
    });
}