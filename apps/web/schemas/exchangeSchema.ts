import { z } from "zod"

export const exchangeSchema = z.object({
  amount: z.coerce
    .number()
    .min(1.0, { message: "Amount must be at least 1" })
    .refine((val) => !isNaN(val), { message: "Amount must be a valid number" }),
})

export type ExchangeFormValues = z.infer<typeof exchangeSchema>
