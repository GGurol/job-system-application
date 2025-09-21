import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getApiUrl = (): string => {
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || 'http://backend:3001';
  }
  
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
};