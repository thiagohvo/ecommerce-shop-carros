import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { OrderItemDTO } from "./order-item.dto";

/**
 * Configuração de status de pedidos com suas respectivas cores e labels.
 * Utilizado para renderização de badges coloridos na interface.
 */
export const OrderStatus = [
  {
    value: "NEW",
    label: "Novo",
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
  },
  {
    value: "SEPARATION",
    label: "Em Separação",
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-300",
  },
  {
    value: "INVOICED",
    label: "Faturado",
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-300",
  },
  {
    value: "SHIPPED",
    label: "Enviado",
    bg: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-cyan-300",
  },
  {
    value: "DELIVERED",
    label: "Entregue",
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
  },
  {
    value: "CANCELED",
    label: "Cancelado",
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
  },
];

/**
 * Data Transfer Object para representação de pedidos.
 * Contém informações do cliente, itens, valores e status do pedido.
 */
export interface OrderDTO {
    /**
     * Identificador único do pedido (gerado pelo backend)
     * Opcional ao criar novo pedido
     */
    id?: string;
    
    /**
     * Cliente que realizou o pedido
     * Pode ser o objeto CustomerDTO completo ou apenas o ID (string)
     */
    customer: CustomerDTO | string;
    
    /**
     * Status atual do pedido
     * Valores possíveis: NEW, SEPARATION, INVOICED, SHIPPED, DELIVERED, CANCELED
     */
    status: string;
    
    /**
     * Valor total do pedido (soma dos itens + frete)
     */
    total: number;
    
    /**
     * Valor do frete
     */
    shipping: number;
    
    /**
     * Lista de itens (produtos) do pedido
     * Opcional ao criar o pedido, populado posteriormente
     */
    items?: OrderItemDTO[];
    
    /**
     * Data de criação do pedido (gerada pelo backend)
     */
    createdAt?: Date;
    
    /**
     * Data da última atualização do pedido (atualizada pelo backend)
     */
    updatedAt?: Date;
}