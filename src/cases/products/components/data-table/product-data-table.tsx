import { DataTable } from "@/components/ui/data-table";
import { productColumns } from "./product-columns";
import { useProducts } from "@/cases/products/hooks/use-product";

/**
 * Props do componente ProductDataTable
 */
type ProductDataTableProps = {
    searchTerm: string;
}

/**
 * Componente que exibe a tabela de produtos com funcionalidade de busca.
 * Filtra produtos pelo nome baseado no termo de pesquisa fornecido.
 */
export function ProductDataTable({ searchTerm }: ProductDataTableProps) {
    // Busca todos os produtos da API
    const { data: products = [], isLoading } = useProducts();

    /**
     * Filtra produtos pelo termo de busca (case-insensitive)
     * Busca por correspondência parcial no nome do produto
     */
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Estado de loading */}
            {isLoading ? (
                <p>Carregando...</p>
            ) : (
                /* Tabela com produtos filtrados */
                <DataTable columns={productColumns} data={filteredProducts} />
            )}
        </div>
    );
}