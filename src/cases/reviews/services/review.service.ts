import { api } from "../../../lib/axios";
import type { ReviewDTO } from "../dtos/review.dto";

const _ENDPOINT = '/reviews';

export const ReviewService = {

    async list(): Promise<ReviewDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    async listByProduct(productId: string) {
        const result = await api.get(`${_ENDPOINT}?productId=${productId}`);
        return result.data;
    },

    async create(review: Omit<ReviewDTO, "id">): Promise<ReviewDTO> {
        const result = await api.post(_ENDPOINT, review);
        return result.data;
    }
};