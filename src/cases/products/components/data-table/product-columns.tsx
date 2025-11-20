import { type ColumnDef } from "@tanstack/react-table";
import type { ProductDTO } from "../../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";

export const productColumns: ColumnDef<ProductDTO>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {
        const product = row.original
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            {product.id}
          </p>       
        )
      }
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => {
        const product = row.original
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            {product.name}
          </p>       
        )
      }
    },
    {
      accessorKey: "category.name",
      header: "Categoria",
      cell: ({ row }) => {
        const product = row.original
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            {product.category?.name}
          </p>       
        )
      }
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => {
        const product = row.original
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
              <IntlProvider locale="pt-BR">
                  <FormattedNumber value={product.price} style="currency" currency="BRL" />
              </IntlProvider>
          </p>       
        )
      }
    }
];