import { useState } from "react";
import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ProductDataTable } from "@/cases/products/components/data-table/product-data-table";

/**
 * Componente de layout da página de produtos favoritos.
 * Permite visualizar e buscar produtos marcados como favoritos pelo usuário.
 */
export function FavoriteLayout() {
    // Estado do campo de busca
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-8">
            <div className="flex flex-col gap-4">
                {/* Cabeçalho com título e campo de busca */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold">Favoritos</h1>
                    
                    {/* Campo de busca de produtos */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <InputGroup className="max-w-96 w-full sm:w-80">
                            <InputGroupInput 
                                placeholder="Pesquise por produto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <InputGroupAddon>
                                <Search className="text-gray-500" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>

                {/* Tabela de produtos favoritos com busca */}
                <div>
                    <ProductDataTable searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    );
}