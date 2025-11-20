import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductDTO } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";
import { toast } from "react-toastify";

export function useProducts() {
    return useQuery<ProductDTO[]>({
        queryKey: ["products"],
        queryFn: ProductService.list
    });
}

export function useProduct(id: string) {
    return useQuery<ProductDTO>({
        queryKey: ["products", id],
        queryFn: () => ProductService.getById(id),
        enabled: !!id
    });
}    

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<ProductDTO, Error, Omit<ProductDTO, 'id'>>({
        mutationFn: (product: Omit<ProductDTO, 'id'>) => ProductService.create(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Registro adicionado com sucesso!');
        },
        onError: (error) => {
            toast.error(`Erro ao adicionar: ${error.message}`);
        }
    })
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation<ProductDTO, Error, {id: string, product: ProductDTO}>({
        mutationFn: ({id, product}) => ProductService.update(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Registro alterado com sucesso!');
        },
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`);
        }
    })
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => ProductService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Registro excluído com sucesso!');
        },
        onError: (error) => {
            toast.error(`Erro ao excluir: ${error.message}`);
        }
    })
}