import { IsDecimal, IsEnum } from 'class-validator';
import { SupportedCurrencyPair } from './GetCurrencyPairDto.dto';

export class PostExchangeTransactionDto {
  @IsDecimal()
  amount: string;

  @IsEnum(SupportedCurrencyPair, {
    message: 'Not the correct currency code!',
  })
  currencyPair: SupportedCurrencyPair;
}
