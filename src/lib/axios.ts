import axios from "axios";

/**
 * Instância configurada do Axios para comunicação com o backend.
 * 
 * Configurações:
 * - baseURL: URL base da API definida nas variáveis de ambiente (VITE_API_URL)
 * - headers: Define o tipo de conteúdo padrão como JSON para todas as requisições
 * 
 * Uso:
 * import { api } from '@/lib/api';
 * const response = await api.get('/products');
 */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});