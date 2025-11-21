import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "../context/cart-context";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCreateOrder } from "@/cases/orders/hooks/use-order";
import { useCreateOrderItem } from "@/cases/orders/hooks/use-order-item";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

/**
 * Componente responsável pela exibição e gerenciamento do carrinho de compras.
 * Permite visualizar produtos adicionados, ajustar quantidades, remover itens
 * e finalizar a compra criando um pedido na API.
 */
export function Cart() {
  // Obtém funcionalidades do carrinho através do contexto global
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  
  // Hooks para comunicação com a API backend
  const { customer } = useCurrentCustomer();
  const createOrder = useCreateOrder();
  const createOrderItem = useCreateOrderItem();

  // Controla o estado de processamento durante a finalização do pedido
  const [isProcessing, setIsProcessing] = useState(false);

  // Calcula o valor total do carrinho somando (preço × quantidade) de cada produto
  const total = cart.reduce((sum, p) => sum + Number(p.price || 0) * (p.quantity || 1), 0);

  /**
   * Remove todos os produtos do carrinho e exibe notificação
   */
  const handleClearCart = () => {
    clearCart();
    toast.info("Carrinho limpo com sucesso!");
  };

  /**
   * Finaliza a compra criando um pedido e seus itens na API.
   * Fluxo: Cria pedido principal -> Cria itens do pedido -> Limpa carrinho local
   */
  const handleFinishOrder = async () => {
    setIsProcessing(true);

    try {
      // Cria o registro do pedido no banco de dados via API
      const newOrder = await createOrder.mutateAsync({
        shipping: 0,
        status: "NEW",
        total,
        customer: customer?.id || "temp-id",
      });

      // Cria cada item do pedido associado ao pedido principal
      await Promise.all(
        cart.map((p) =>
          createOrderItem.mutateAsync({
            quantity: p.quantity || 1,
            value: Number(p.price || 0),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            order: newOrder as any,
            product: p as ProductDTO,
          })
        )
      );

      // Exibe mensagem de sucesso e limpa o carrinho
      toast.success("Compra finalizada com sucesso!");
      clearCart();
    } catch (error) {
      // Captura e registra erros sem interromper o fluxo
      console.error("Erro ao processar pedido:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {/* Renderização condicional: exibe produtos ou mensagem de carrinho vazio */}
      {cart.length > 0 ? (
        <>
          {/* Grid responsivo de produtos no carrinho */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cart.map((product) => (
              <Card 
                key={product.id || product.name} 
                className="flex flex-col justify-between h-full"
              >
                {/* Cabeçalho do card com nome do produto */}
                <CardHeader>
                  <h2 className="text-lg font-semibold">
                    {product.name || "Produto sem nome"}
                  </h2>
                </CardHeader>

                {/* Conteúdo principal do card */}
                <CardContent className="flex flex-col justify-between h-full">
                  {/* Descrição do produto (se existir) */}
                  {product.description ? (
                    <p className="text-sm text-gray-600 mb-2 whitespace-pre-line wrap-break-words">
                      {product.description}
                    </p>
                  ) : (
                    <div className="h-full" />
                  )}

                  {/* Preço unitário do produto */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-green-600 text-lg">
                      R$ {Number(product.price || 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Controles de quantidade (+/-) */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => product.id && decreaseQuantity(product.id)}
                      disabled={product.quantity <= 1}
                    >
                      –
                    </Button>

                    <span className="font-medium">{product.quantity || 1}</span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => product.id && increaseQuantity(product.id)}
                    >
                      +
                    </Button>
                  </div>

                  {/* Subtotal do produto (preço × quantidade) */}
                  <p className="mt-4 text-center text-gray-500 text-sm">
                    Subtotal:{" "}
                    <span className="font-semibold text-green-600">
                      R$ {(Number(product.price || 0) * (product.quantity || 1)).toFixed(2)}
                    </span>
                  </p>
                </CardContent>

                {/* Botão para remover produto do carrinho */}
                <CardFooter className="mt-auto">
                  <Button
                    variant="destructive"
                    className="w-full cursor-pointer"
                    onClick={() => product.id && removeFromCart(product.id)}
                  >
                    Remover
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Resumo do carrinho e ações finais */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
            {/* Exibição do valor total */}
            <h2 className="text-xl font-semibold">
              Total: <span className="text-green-600">R$ {total.toFixed(2)}</span>
            </h2>

            {/* Botões de ação */}
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleClearCart}
                disabled={isProcessing}
              >
                Limpar carrinho
              </Button>

              <Button
                onClick={handleFinishOrder}
                disabled={isProcessing}
              >
                {isProcessing ? "Processando..." : "Finalizar compra"}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      )}
    </div>
  );
}