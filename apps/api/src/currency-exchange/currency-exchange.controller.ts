import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { GetCurrencyPairDto } from './dto/get-currency-exchange.dto';

@Controller('currency-exchange')
export class CurrencyExchangeController {
  constructor(private readonly currencyExchangeService: CurrencyExchangeService) {}

  @Get('/exchange-rate')
  async GetRate(@Query(new ValidationPipe()) currencyPair: GetCurrencyPairDto) {
   const res = await this.currencyExchangeService.getExchangeRate(currencyPair);
    return (res.data);
  }

}
