import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Função utilitária para mesclar classes CSS condicionalmente.
 * Combina a funcionalidade do clsx (classes condicionais) com twMerge (merge inteligente de classes Tailwind).
 * 
 * Benefícios:
 * - Permite classes condicionais: cn("base", condition && "conditional")
 * - Resolve conflitos de classes Tailwind: cn("p-4", "p-2") resulta em "p-2"
 * - Aceita arrays, objetos e strings
 * 
 * Exemplos:
 * cn("text-base", "font-bold") // "text-base font-bold"
 * cn("p-4", "p-2") // "p-2" (twMerge remove conflito)
 * cn("bg-red-500", isActive && "bg-blue-500") // condicional
 * 
 * @param inputs - Classes CSS para mesclar
 * @returns String com classes CSS mescladas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}