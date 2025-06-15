"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Euro, Loader2, Wallet } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  exchangeSchema,
  type ExchangeFormValues,
} from "@/schemas/exchangeSchema"
import { useExchangeTransaction } from "@/hooks/useExchangeTransaction"
import { useForm } from "react-hook-form"

interface ExchangeFormProps {
  currencyPair: string
}

export default function ExchangeForm({ currencyPair }: ExchangeFormProps) {
  const form = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      amount: 0,
    },
  })

  const {
    data: transactionResult,
    loading,
    error,
    executeTransaction,
  } = useExchangeTransaction()

  async function onSubmit(values: ExchangeFormValues) {
    await executeTransaction({
      amount: "" + values.amount,
      currencyPair: currencyPair,
    })
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Exchange {currencyPair.split("-")[0]} to {currencyPair.split("-")[1]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg flex items-center">
                    <Euro className="mr-2 h-5 w-5" /> Amount in{" "}
                    {currencyPair.split("-")[0]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="5"
                      placeholder="e.g., 100.00"
                      {...field}
                      className="text-lg p-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Convert"
              )}
            </Button>
          </form>
        </Form>

        {transactionResult && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-center">
            <p className="text-xl font-semibold flex items-center justify-center">
              <Wallet className="mr-2 h-5 w-5" />
              You will get{" "}
              <span className="ml-2 text-2xl font-bold">
                {transactionResult.convertedAmount.toFixed(2)}{" "}
                {currencyPair.split("-")[1]}
              </span>
            </p>
            <p className="text-sm mt-1 opacity-90">
              (Based on {transactionResult.amount.toFixed(2)}{" "}
              {transactionResult.currencyPair.split("-")[0]})
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-center">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
