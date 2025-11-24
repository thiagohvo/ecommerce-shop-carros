import { useQuery } from "@tanstack/react-query";
import type { CityDTO } from "../dtos/city.dto";
import { CityService } from "../services/city.service";

/**
 * Hook para buscar todas as cidades disponíveis.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de cidades (incluindo estado associado), loading e erro
 * 
 * Exemplo:
 * const { data: cities, isLoading, error } = useCities();
 */
export function useCities() {
    return useQuery<CityDTO[]>({
        queryKey: ["cities"],
        queryFn: CityService.list
    });
}

/**
 * Hook para buscar uma cidade específica por ID.
 * A query só é executada se o ID for fornecido (enabled: !!id).
 * 
 * @param id - Identificador único da cidade
 * @returns Query com dados da cidade e seu estado, loading e erro
 * 
 * Exemplo:
 * const { data: city, isLoading } = useCity("123");
 */
export function useCity(id: string) {
    return useQuery<CityDTO>({
        queryKey: ["cities", id],
        queryFn: () => CityService.getById(id),
        enabled: !!id // Só executa a query se o ID existir
    });
}