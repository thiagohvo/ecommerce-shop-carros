import { Star } from "lucide-react";

type AverageStarsProps = {
  rating: number; // valor de 0 a 5
};

export function AverageStars({ rating }: AverageStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-5 h-5 ${
            n <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
