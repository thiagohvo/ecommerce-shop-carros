import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { OrderItemDTO } from "./order-item.dto";

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

export interface OrderDTO {
    id?: string;
    customer: CustomerDTO | string;
    status: string;
    total: number;
    shipping: number;
    items?: OrderItemDTO[];
    createdAt?: Date;
    updatedAt?: Date;
}