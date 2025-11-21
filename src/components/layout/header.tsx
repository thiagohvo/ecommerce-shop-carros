import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCart } from "@/cases/cart/context/cart-context";

/**
 * Componente de cabeçalho da aplicação.
 * Exibe logo, carrinho de compras e menu do usuário com navegação.
 */
export function Header() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calcula o total de itens no carrinho para exibir no badge
  const totalItems = cart.length;

  /**
   * Realiza o logout do usuário:
   * - Remove token do localStorage
   * - Limpa carrinho
   * - Redireciona para login
   */
  const handleLogout = () => {
    localStorage.removeItem("user");
    clearCart();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo com link para página de produtos */}
        <Link 
          to="/products" 
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors ml-12"
        >
          Ecommerce Shop
        </Link>

        {/* Navegação principal: Carrinho e Menu do usuário */}
        <div className="flex flex-row gap-10 mr-12">
          {/* Botão do carrinho com badge de quantidade */}
          <Button 
            variant="outline"
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Carrinho</span>

            {/* Badge circular mostrando quantidade de itens */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Menu dropdown do usuário */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* Ícone de usuário que abre o menu */}
                <NavigationMenuTrigger className="flex items-center gap-2 px-3 py-2">
                  <User className="w-6 h-6" />
                </NavigationMenuTrigger>

                {/* Conteúdo do menu dropdown */}
                <NavigationMenuContent className="p-2 w-32">
                  {/* Opção: Minha Conta */}
                  <NavigationMenuLink asChild>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => navigate('/account')}
                    >
                      Conta
                    </Button>
                  </NavigationMenuLink>

                  {/* Opção: Favoritos */}
                  <NavigationMenuLink asChild>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => navigate('/favorites')}
                    >
                      Favoritos
                    </Button>
                  </NavigationMenuLink>
                  
                  {/* Opção: Logout */}
                  <NavigationMenuLink asChild>
                    <Button 
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}