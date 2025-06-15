import { IsDecimal, IsEnum } from 'class-validator';
import { SupportedCurrencyPair } from './GetCurrencyPairDto.dto';

export class CreateCurrencyExchangeTransactionDto {
  @IsDecimal()
  amount: string;

  @IsDecimal()
  equivalent: string;

  @IsEnum(SupportedCurrencyPair, {
    message: 'Not the correct currency code!',
  })
  currencyPair: SupportedCurrencyPair;

  @IsDecimal()
  currencyRate: string;
}
