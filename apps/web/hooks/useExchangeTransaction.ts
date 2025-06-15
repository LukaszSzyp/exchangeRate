"use client"

import {
  ExchangeTransactionRequest,
  ExchangeTransactionResponse,
} from "@/lib/utils"
import { useState, useCallback } from "react"

export function useExchangeTransaction() {
  const [data, setData] = useState<ExchangeTransactionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const executeTransaction = useCallback(
    async (transactionData: ExchangeTransactionRequest) => {
      setLoading(true)
      setError(null)
      setData(null)
      try {
        const response = await fetch(
          "http://localhost:4000/currency-exchange/exchange-transaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to process transaction")
        }

        const result: ExchangeTransactionResponse = await response.json()
        setData(result)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { data, loading, error, executeTransaction }
}
