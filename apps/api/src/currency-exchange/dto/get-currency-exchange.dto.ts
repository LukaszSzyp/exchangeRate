import { IsEnum } from "class-validator"

export const currencyPair = [
    "EUR-PLN"
]


export class GetCurrencyPairDto {
    @IsEnum(["EUR-PLN"], {message: 'Not the correct currency pair!'})
    currencyPair:typeof currencyPair[number]
}