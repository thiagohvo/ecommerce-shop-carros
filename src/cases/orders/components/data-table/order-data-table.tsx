import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "./order-columns";
import { useOrders } from "../../hooks/use-order";
import { useCustomers } from "@/cases/customers/hooks/use-customer";

/**
 * Componente que exibe a tabela de pedidos do usuário logado.
 * Filtra e exibe apenas os pedidos pertencentes ao cliente atual.
 */
export function OrderDataTable() {
    // Busca dados de clientes e pedidos da API
    const { data: customers } = useCustomers();
    const { data: orders, isLoading } = useOrders();

    // Recupera ID do usuário logado do localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;
    
    // Encontra o registro de cliente correspondente ao usuário logado
    const customer = customers?.find((customer) => customer.userId === userId);

    /**
     * Filtra pedidos para exibir apenas os do cliente atual.
     * Lida com dois formatos: customer como string (ID) ou objeto completo.
     */
    const filteredOrders = orders?.filter(order => {
        if (!customer) return false;

        // Verifica se customer é apenas o ID (string)
        if (typeof order.customer === "string") {
            return order.customer === customer.id;
        }

        // Verifica se customer é o objeto completo
        return order.customer?.id === customer.id;
    }) ?? [];

    return (
        <div>
            {/* Estado de loading */}
            {isLoading ? (
                <p>Carregando...</p>
            ) : filteredOrders.length === 0 ? (
                /* Mensagem quando não há pedidos */
                <p>Nenhum pedido encontrado.</p>
            ) : (
                /* Tabela de pedidos com scroll vertical */
                <div className="max-h-[40vh] overflow-y-auto rounded-md">
                    <DataTable columns={orderColumns} data={filteredOrders} />
                </div>
            )}
        </div>
    );
}