import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const truncater = ({text, limit}: {text: string, limit: number}) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "..."
  }
  return text
}



