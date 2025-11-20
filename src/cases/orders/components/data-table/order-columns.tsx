import { type ColumnDef } from "@tanstack/react-table"
import type { OrderDTO } from "../../dtos/order.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { DataTableBadge } from "@/components/layout/data-table-badge";

export const orderColumns: ColumnDef<OrderDTO>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "createdAt",
    header: "Data Pedido",
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
    cell: ({ row }) => {
      const order = row.original
      return (
        <p>
            <IntlProvider locale="pt-BR">
                <FormattedNumber value={order.total} style="currency" currency="BRL" />
            </IntlProvider>
        </p>       
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      return (
          <DataTableBadge status={order.status} />
      );
    }
  }
];