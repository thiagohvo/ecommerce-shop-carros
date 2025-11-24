import { useQuery } from "@tanstack/react-query";
import type { CategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";

/**
 * Hook para buscar todas as categorias disponíveis.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de categorias, estado de loading e erro
 * 
 * Exemplo:
 * const { data: categories, isLoading, error } = useCategories();
 */
export function useCategories() {
    return useQuery<CategoryDTO[]>({
        queryKey: ["categories"],
        queryFn: CategoryService.list
    });
}

/**
 * Hook para buscar uma categoria específica por ID.
 * A query só é executada se o ID for fornecido (enabled: !!id).
 * 
 * @param id - Identificador único da categoria
 * @returns Query com dados da categoria, estado de loading e erro
 * 
 * Exemplo:
 * const { data: category, isLoading } = useCategory("123");
 */
export function useCategory(id: string) {
    return useQuery<CategoryDTO>({
        queryKey: ["categories", id],
        queryFn: () => CategoryService.getById(id),
        enabled: !!id // Só executa a query se o ID existir
    });
}