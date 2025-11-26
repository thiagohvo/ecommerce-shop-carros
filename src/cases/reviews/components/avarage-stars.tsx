import { Star } from "lucide-react";

/**
 * Props do componente AverageStars
 */
type AverageStarsProps = {
  /**
   * Avaliação média do produto
   * Valor de 0 a 5 (pode ser decimal, ex: 4.5)
   */
  rating: number;
};

/**
 * Componente que exibe a avaliação média de um produto em formato de estrelas.
 * Renderiza 5 estrelas, preenchendo proporcionalmente à nota recebida.
 * 
 * Exemplo:
 * <AverageStars rating={4.5} /> // Exibe 4 estrelas completas e meia estrela
 */
export function AverageStars({ rating }: AverageStarsProps) {
  return (
    <div className="flex gap-1">
      {/* Renderiza as 5 estrelas */}
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-5 h-5 ${
            // Preenche estrela se o número for menor ou igual à avaliação
            n <= rating 
              ? "fill-yellow-500 text-yellow-500" // Estrela preenchida (amarelo)
              : "text-gray-300" // Estrela vazia (cinza)
          }`}
        />
      ))}
    </div>
  );
}