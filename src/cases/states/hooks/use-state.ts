import { useQuery } from "@tanstack/react-query";
import type { StateDTO } from "../dtos/state.dto";
import { StateService } from "../services/state.service";

/**
 * Hook para buscar todos os estados (UF) disponíveis.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de estados brasileiros, loading e erro
 * 
 * Exemplo:
 * const { data: states, isLoading, error } = useStates();
 */
export function useStates() {
    return useQuery<StateDTO[]>({
        queryKey: ["states"],
        queryFn: StateService.list
    });
}

/**
 * Hook para buscar um estado (UF) específico por ID.
 * A query só é executada se o ID for fornecido (enabled: !!id).
 * 
 * @param id - Identificador único do estado
 * @returns Query com dados do estado (nome, sigla, código IBGE), loading e erro
 * 
 * Exemplo:
 * const { data: state, isLoading } = useState("123");
 */
export function useState(id: string) {
    return useQuery<StateDTO>({
        queryKey: ["states", id],
        queryFn: () => StateService.getById(id),
        enabled: !!id // Só executa a query se o ID existir
    });
}