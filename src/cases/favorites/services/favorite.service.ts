import { api } from "../../../lib/axios";
import type { FavoriteDTO } from "../dtos/favorite.dto";

const _ENDPOINT = '/favorites';

export const FavoriteService = {
    async list(customerId: string): Promise<FavoriteDTO[]> {
        if (!customerId) throw new Error("customerId inválido");

        const result = await api.get(_ENDPOINT, {
            params: { customerId }
        });
        return result.data;
    },

    async toggle(customerId: string, productId: string): Promise<void> {
        if (!customerId || !productId) {
            throw new Error("customerId ou productId inválido");
        }

        try {
            await api.post(_ENDPOINT, {
                customerId,
                productId
            });
        } catch (err) {
            console.error("Erro ao favoritar produto:", err);
            throw err; 
        }
    }
};
