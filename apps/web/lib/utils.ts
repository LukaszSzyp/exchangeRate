import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ExchangeRateResponse {
  exchange_rate: number
}

export interface ExchangeTransactionRequest {
  amount: string
  currencyPair: string
}

export interface ExchangeTransactionResponse {
  equivalent: string
}
