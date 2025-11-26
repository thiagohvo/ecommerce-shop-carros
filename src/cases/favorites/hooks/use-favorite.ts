import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FavoriteService } from "../services/favorite.service";
import type { FavoriteDTO } from "../dtos/favorite.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useProducts } from "@/cases/products/hooks/use-product";

/**
 * Hook para buscar os favoritos de um cliente específico.
 * A query só é executada se o customerId for fornecido.
 * 
 * @param customerId - Identificador único do cliente (opcional)
 * @returns Query com lista de favoritos do cliente, loading e erro
 * 
 * Exemplo:
 * const { data: favorites, isLoading } = useFavorites(customer?.id);
 */
export function useFavorites(customerId?: string) {
    return useQuery<FavoriteDTO[]>({
        queryKey: ['favorites', customerId],
        queryFn: () => {
            // Retorna array vazio se não houver customerId
            if (!customerId) return Promise.resolve([]);
            return FavoriteService.list(customerId);
        },
        enabled: !!customerId // Só executa a query se o customerId existir
    });
}

/**
 * Hook para adicionar/remover produtos dos favoritos (toggle).
 * Invalida o cache e exibe notificações de sucesso/erro automaticamente.
 * Usa estratégia de UX otimista no componente que chama este hook.
 * 
 * @returns Mutation para alternar favorito
 * 
 * Exemplo:
 * const toggleFavorite = useToggleFavorite();
 * toggleFavorite.mutate(productId);
 */
export function useToggleFavorite() {
    const { customer } = useCurrentCustomer();
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (productId: string) => {
            // Valida se cliente está carregado
            if (!customer?.id) throw new Error("Cliente não carregado");
            if (!productId) throw new Error("Produto inválido");

            // Alterna o status de favorito no backend
            return FavoriteService.toggle(customer.id, productId);
        },
        onSuccess: () => {
            // Invalida cache para forçar recarregamento dos favoritos
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success("Produto favoritado com sucesso!");
        },
        onError: (error) => {
            toast.error(`Erro ao favoritar: ${error.message}`);
        }
    });
}

/**
 * Hook que combina favoritos e produtos para retornar apenas produtos favoritos completos.
 * Útil para exibir lista de produtos favoritos com todas as informações.
 * 
 * @returns Objeto contendo array de produtos favoritos e estado de loading
 * 
 * Exemplo:
 * const { favoriteProducts, isLoading } = useFavoriteProducts();
 */
export function useFavoriteProducts() {
    const { customer } = useCurrentCustomer();
    const { data: favorites = [], isLoading: loadingFav } = useFavorites(customer?.id);
    const { data: products = [], isLoading: loadingProd } = useProducts();

    // Considera loading se qualquer uma das queries estiver carregando
    const isLoading = loadingFav || loadingProd;

    /**
     * Filtra produtos para retornar apenas os que estão nos favoritos
     * Combina dados de favoritos (relacionamento) com produtos (dados completos)
     */
    const favoriteProducts = customer && favorites.length > 0 && products.length > 0
        ? products.filter((p) => favorites.some((f) => f.product.id === p.id))
        : [];

    return { favoriteProducts, isLoading };
}