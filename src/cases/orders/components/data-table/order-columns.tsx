import { type ColumnDef } from "@tanstack/react-table";
import { FormattedNumber, IntlProvider } from "react-intl";
import type { OrderDTO } from "../../dtos/order.dto";
import { DataTableBadge } from "@/components/layout/data-table-badge";

/**
 * Definição das colunas da tabela de pedidos.
 * Utilizada pelo componente DataTable para renderizar a lista de pedidos do usuário.
 */
export const orderColumns: ColumnDef<OrderDTO>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "createdAt",
    header: "Data Pedido",
    /**
     * Formata a data de criação do pedido no padrão brasileiro (dd/mm/aaaa)
     */
    cell: ({ row }) => {
      const order = row.original;
      return (
        <p>{new Date(order.createdAt!).toLocaleDateString('pt-BR')}</p>
      );
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    /**
     * Formata o valor total do pedido como moeda brasileira (R$)
     */
    cell: ({ row }) => {
      const order = row.original;
      return (
        <p>
          <IntlProvider locale="pt-BR">
            <FormattedNumber 
              value={order.total} 
              style="currency" 
              currency="BRL" 
            />
          </IntlProvider>
        </p>       
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    /**
     * Renderiza um badge colorido representando o status do pedido
     */
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DataTableBadge status={order.status} />
      );
    }
  }
];