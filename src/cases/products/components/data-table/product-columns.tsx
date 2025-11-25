import { type ColumnDef } from "@tanstack/react-table";
import { FormattedNumber, IntlProvider } from "react-intl";
import type { ProductDTO } from "../../dtos/product.dto";

/**
 * Definição das colunas da tabela de produtos.
 * Utilizada pelo componente DataTable para renderizar a lista de produtos.
 * Produtos inativos são exibidos em cinza claro.
 */
export const productColumns: ColumnDef<ProductDTO>[] = [
    {
      accessorKey: "id",
      header: "Id",
      /**
       * Renderiza o ID do produto com estilo condicional
       * Produtos inativos aparecem em cinza claro
       */
      cell: ({ row }) => {
        const product = row.original;
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            {product.id}
          </p>       
        );
      }
    },
    {
      accessorKey: "name",
      header: "Nome",
      /**
       * Renderiza o nome do produto com estilo condicional
       */
      cell: ({ row }) => {
        const product = row.original;
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            {product.name}
          </p>       
        );
      }
    },
    {
      accessorKey: "category.name",
      header: "Categoria",
      /**
       * Renderiza o nome da categoria associada ao produto
       * Utiliza optional chaining para evitar erro se categoria não existir
       */
      cell: ({ row }) => {
        const product = row.original;
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            {product.category?.name}
          </p>       
        );
      }
    },
    {
      accessorKey: "price",
      header: "Preço",
      /**
       * Renderiza o preço formatado como moeda brasileira (R$)
       */
      cell: ({ row }) => {
        const product = row.original;
        return (
          <p className={!product.active ? "text-gray-300" : ''}>
            <IntlProvider locale="pt-BR">
              <FormattedNumber 
                value={product.price} 
                style="currency" 
                currency="BRL" 
              />
            </IntlProvider>
          </p>       
        );
      }
    }
];