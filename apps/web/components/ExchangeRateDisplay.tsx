import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ArrowRight } from "lucide-react"
import { ExchangeRateResponse } from "@/lib/utils"

export default function ExchangeRateDisplay({
  rateData,
  currencyPair,
}: {
  rateData: ExchangeRateResponse
  currencyPair: string
}) {
  return (
    <Card className="grid content-center w-full max-w-md bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center justify-center">
          <span className="mr-2">{currencyPair.split("-")[0]}</span>
          <ArrowRight className="h-5 w-5" />
          <span className="ml-2">{currencyPair.split("-")[1]}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-5xl font-extrabold tracking-tight">
          {rateData.exchange_rate}
        </p>
      </CardContent>
    </Card>
  )
}
