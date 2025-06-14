import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { GetCurrencyPairDto } from './dto/get-currency-exchange.dto';

@Controller('currency-exchange')
export class CurrencyExchangeController {
  constructor(private readonly currencyExchangeService: CurrencyExchangeService) {}

  @Get('exchange-rate')
  async getRate(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    currencyPairDto: GetCurrencyPairDto,
  ) {
    try {
      const { data } = await this.currencyExchangeService.getExchangeRate(
        currencyPairDto,
      );
      return data;
    } catch (err) {
      // Re-throw as a Nest HttpException or map as needed
      throw err;
    }
  }

}
