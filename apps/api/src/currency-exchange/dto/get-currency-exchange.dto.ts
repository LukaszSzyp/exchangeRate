import { IsEnum } from 'class-validator';

export enum SupportedCurrencyPair {
  EUR_PLN = 'EUR-PLN',
}

export class GetCurrencyPairDto {
  @IsEnum(SupportedCurrencyPair, {
    message: 'Not the correct currency pair!',
  })
  currencyPair: SupportedCurrencyPair;
}
