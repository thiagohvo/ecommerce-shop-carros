import { Badge } from "../ui/badge";
import { OrderStatus } from "@/cases/orders/dtos/order.dto";

/**
 * Props do componente DataTableBadge
 */
type DataTableBadgeProps = {
    status: string;
}

/**
 * Componente que exibe um badge visual representando o status de um pedido.
 * Aplica cores e estilos específicos baseados no tipo de status.
 */
export function DataTableBadge({ status }: DataTableBadgeProps) {
    // Busca as informações de estilo e label do status na lista de status disponíveis
    const info = OrderStatus.find((s) => s.value === status);

    return (
        status ? (
            <Badge 
                variant="outline"
                className={`${info?.bg} ${info?.border} ${info?.text}`}
            >
                {info?.label}
            </Badge>
        ) : (
            <p>Não encontrado!</p>
        )
    );
}