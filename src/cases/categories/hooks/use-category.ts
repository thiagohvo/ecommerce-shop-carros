import { useQuery } from "@tanstack/react-query";
import type { CategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";

export function useCategories() {
    return useQuery<CategoryDTO[]>({
        queryKey: ["categories"],
        queryFn: CategoryService.list
    });
}

export function useCategory(id: string) {
    return useQuery<CategoryDTO>({
        queryKey: ["categories", id],
        queryFn: () => CategoryService.getById(id),
        enabled: !!id
    });
}