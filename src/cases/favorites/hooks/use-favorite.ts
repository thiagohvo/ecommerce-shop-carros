import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteService } from "../services/favorite.service";
import type { FavoriteDTO } from "../dtos/favorite.dto";
import { toast } from "react-toastify";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useProducts } from "@/cases/products/hooks/use-product";

export function useFavorites(customerId?: string) {
    return useQuery<FavoriteDTO[]>({
        queryKey: ['favorites', customerId],
        queryFn: () => {
            if (!customerId) return Promise.resolve([]);
            return FavoriteService.list(customerId);
        },
        enabled: !!customerId
    });
}

export function useToggleFavorite() {
    const { customer } = useCurrentCustomer();
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (productId: string) => {
            if (!customer?.id) throw new Error("Cliente não carregado");
            if (!productId) throw new Error("Produto inválido");

            return FavoriteService.toggle(customer.id, productId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success("Produto favoritado com sucesso!");
        },
        onError: (error) => {
            toast.error(`Erro ao favoritar: ${error.message}`);
        }
    });
}

export function useFavoriteProducts() {
    const { customer } = useCurrentCustomer();
    const { data: favorites = [], isLoading: loadingFav } = useFavorites(customer?.id);
    const { data: products = [], isLoading: loadingProd } = useProducts();

    const isLoading = loadingFav || loadingProd;

    const favoriteProducts = customer && favorites.length > 0 && products.length > 0
        ? products.filter((p) => favorites.some((f) => f.product.id === p.id))
        : [];

    return { favoriteProducts, isLoading };
}
