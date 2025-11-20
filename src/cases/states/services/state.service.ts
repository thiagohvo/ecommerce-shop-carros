import { api } from "../../../lib/axios";
import type { StateDTO } from "../dtos/state.dto";

const _ENDPOINT = "/states";

export const StateService = {

    async list(): Promise<StateDTO[]> {
        const result = await api.get(_ENDPOINT);
        return result.data;
    },

    async getById(id: string): Promise<StateDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    }
};