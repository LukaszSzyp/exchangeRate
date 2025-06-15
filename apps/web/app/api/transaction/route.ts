import { ExchangeTransactionResponse } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const apiKey = process.env.API_KEY

  if (!apiKey) {
    throw new Error("API_KEY is not set")
  }

  const body = await req.json()

  if (req.method === "POST") {
    const response = await fetch(
      "http://localhost:4000/currency-exchange/exchange-transaction",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    )

    const data = await response.json()

    return NextResponse.json(data)
  }
}
