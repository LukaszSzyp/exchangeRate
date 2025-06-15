import ExchangeForm from "@/components/ExchangeForm"
import ExchangeRateDisplay from "@/components/ExchangeRateDisplay"
import { ExchangeRateResponse } from "@/lib/utils"

async function getExchangeRate(): Promise<ExchangeRateResponse> {
  const currencyPair = "EUR-PLN"

  // Fetching directly on the server
  const res = await fetch(
    `http://localhost:4000/currency-exchange/exchange-rate?currencyPair=EUR-PLN`,
    {
      cache: "no-store", // Ensure fresh data on each request
    }
  )

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(
      errorData.message || "Failed to fetch exchange rate from backend"
    )
  }
  return res.json()
}

export default async function Home() {
  const rateData = await getExchangeRate()
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600">
            Currency Exchange
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex justify-center">
            <ExchangeRateDisplay rateData={rateData} />
          </div>
          <div className="flex justify-center">
            <ExchangeForm currencyPair={"EUR-PLN"} />
          </div>
        </div>
      </div>
    </main>
  )
}
