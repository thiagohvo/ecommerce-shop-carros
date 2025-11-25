import { useProducts } from "../hooks/use-product";
import { useCategories } from "@/cases/categories/hooks/use-category";
import { useState } from "react";
import { ProductCard } from "./product-card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ProductLayout() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categoriesData = [] } = useCategories();

  const categories = Array.isArray(categoriesData)
    ? categoriesData.filter((category) => category && category.id != null && String(category.id).trim() !== "")
    : [];

  const [selectedCategory, setSelectedCategory] = useState<string>("All"); 
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <p>Carregando Carros...</p>;

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" ? true : String(product.category?.id) === selectedCategory;

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || (product.description?.toLowerCase().includes(query) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Catálogo de Produtos</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <InputGroup className="max-w-96 w-full sm:w-80">
                <InputGroupInput placeholder="Pesquise por produto ou descrição..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}/>

                <InputGroupAddon>
                    <Search className="text-gray-500" />
                </InputGroupAddon>
            </InputGroup>
            
            <Select value={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="max-w-96 w-full sm:w-64">
                    <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="All">Todas as categorias</SelectItem>
                    {
                        categories.map((category) => (
                            <SelectItem key={category.id} value={String(category.id)}>
                                {category.name}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                filteredProducts.length > 0 ? 
                    (filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))) 
                : 
                    (<p>Nenhum Carro encontrado.</p>)
            }
            
      </div>
    </div>
  );
}
