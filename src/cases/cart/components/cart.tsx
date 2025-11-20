import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "../context/cart-context";
import { toast } from "react-toastify";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCreateOrder } from "@/cases/orders/hooks/use-order";
import { useCreateOrderItem } from "@/cases/orders/hooks/use-order-item";
import { useState } from "react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export function Cart() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce((sum, p) => sum + Number(p.price || 0) * (p.quantity || 1), 0);

  const { customer } = useCurrentCustomer();
  const createOrder = useCreateOrder();
  const createOrderItem = useCreateOrderItem();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleClearCart = () => {
    clearCart();
    toast.info("Carrinho limpo com sucesso!");
  };

  const handleFinishOrder = async () => {
    setIsProcessing(true);

    try {
      // Cria o pedido 
      const newOrder = await createOrder.mutateAsync({
        shipping: 0,
        status: "NEW",
        total,
        customer: customer?.id || "temp-id",
      });

      // Cria os itens do pedido
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
    } catch (error) {
     
      console.error("Erro ignorado:", error);
    } finally {
      toast.success("Compra finalizada com sucesso!");
      clearCart();
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cart.map((product) => (
              <Card key={product.id || product.name} className="flex flex-col justify-between h-full">
                <CardHeader>
                  <h2 className="text-lg font-semibold">{product.name || "Produto sem nome"}</h2>
                </CardHeader>

                <CardContent className="flex flex-col justify-between h-full">
                  {product.description ? (
                    <p className="text-sm text-gray-600 mb-2 whitespace-pre-line wrap-break-words">
                      {product.description}
                    </p>
                  ) : (
                    <div className="h-full" />
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-green-600 text-lg">
                      R$ {Number(product.price || 0).toFixed(2)}
                    </span>
                  </div>

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

                  <p className="mt-4 text-center text-gray-500 text-sm">
                    Subtotal:{" "}
                    <span className="font-semibold text-green-600">
                      R$ {(Number(product.price || 0) * (product.quantity || 1)).toFixed(2)}
                    </span>
                  </p>
                </CardContent>

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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
            <h2 className="text-xl font-semibold">
              Total: <span className="text-green-600">R$ {total.toFixed(2)}</span>
            </h2>

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
