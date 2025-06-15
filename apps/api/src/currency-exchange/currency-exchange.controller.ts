import { CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CurrencyPairCacheInterceptors } from './cacheInterceptors/currencyPairCacheInterceptors';
import { CurrencyExchangeService } from './currency-exchange.service';
import { GetCurrencyPairDto } from './dto/get-currency-exchange.dto';

@Controller('currency-exchange')
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @Get('exchange-rate')
  @UseInterceptors(CurrencyPairCacheInterceptors)
  @CacheTTL(60000)
  getRate(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    currencyPairDto: GetCurrencyPairDto,
  ) {
    return this.currencyExchangeService.getExchangeRate(currencyPairDto);
  }
}
