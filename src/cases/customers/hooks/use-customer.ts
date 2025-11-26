import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CustomerDTO } from "../dtos/customer.dto";
import { CustomerService } from "../services/customer.service";

/**
 * Hook para buscar todos os clientes.
 * Utiliza React Query para cache e gerenciamento de estado.
 * 
 * @returns Query com lista de clientes, loading e erro
 * 
 * Exemplo:
 * const { data: customers, isLoading } = useCustomers();
 */
export function useCustomers() {
    return useQuery<CustomerDTO[]>({
        queryKey: ["customers"],
        queryFn: CustomerService.list
    });
}

/**
 * Hook para buscar um cliente específico por ID.
 * A query só é executada se o ID for fornecido (enabled: !!id).
 * 
 * @param id - Identificador único do cliente
 * @returns Query com dados completos do cliente, loading e erro
 * 
 * Exemplo:
 * const { data: customer, isLoading } = useCustomer("123");
 */
export function useCustomer(id: string) {
    return useQuery<CustomerDTO>({
        queryKey: ["customers", id],
        queryFn: () => CustomerService.getById(id),
        enabled: !!id // Só executa a query se o ID existir
    });
}

/**
 * Hook para criar um novo cliente.
 * Utilizado durante o registro de novos usuários.
 * 
 * @returns Mutation para criar cliente
 * 
 * Exemplo:
 * const createCustomer = useCreateCustomer();
 * createCustomer.mutate({ name, address, zipcode, city, userId });
 */
export function useCreateCustomer() {
    return useMutation<CustomerDTO, Error, Omit<CustomerDTO, 'id'>>({
        mutationFn: (customer: Omit<CustomerDTO, 'id'>) => CustomerService.create(customer)
    });
}

/**
 * Hook para atualizar dados de um cliente existente.
 * Invalida o cache e exibe notificações de sucesso/erro.
 * 
 * @returns Mutation para atualizar cliente
 * 
 * Exemplo:
 * const updateCustomer = useUpdateCustomer();
 * updateCustomer.mutate({ id: "123", customer: updatedData });
 */
export function useUpdateCustomer() {
    const queryClient = useQueryClient();

    return useMutation<CustomerDTO, Error, {id: string, customer: CustomerDTO}>({
        mutationFn: ({id, customer}) => CustomerService.update(id, customer),
        onSuccess: () => {
            // Invalida cache para forçar recarregamento dos dados
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            toast.success('Registro alterado com sucesso!');
        },
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`);
        }
    });
}

/**
 * Hook para obter o cliente associado ao usuário logado.
 * Busca o cliente cujo userId corresponde ao ID do usuário autenticado.
 * Utiliza useMemo para otimizar a busca.
 * 
 * @returns Objeto contendo o customer e demais propriedades da query
 * 
 * Exemplo:
 * const { customer, isLoading } = useCurrentCustomer();
 */
export function useCurrentCustomer() {
    const { data: customers, ...rest } = useCustomers();

    // Recupera ID do usuário logado do localStorage
    const localUser = localStorage.getItem("user");
    const userId = localUser ? JSON.parse(localUser).id : null;

    /**
     * Busca o cliente correspondente ao usuário logado
     * Memoizado para evitar recálculo desnecessário
     */
    const customer = useMemo(() => {
        if (!customers || !userId) return undefined;
        return customers.find((c) => c.userId === userId);
    }, [customers, userId]);

    return {
        customer,
        ...rest
    };
}