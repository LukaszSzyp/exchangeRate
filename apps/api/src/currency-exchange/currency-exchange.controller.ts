import { CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CurrencyPairCacheInterceptors } from './cacheInterceptors/currencyPairCacheInterceptors';
import { CurrencyExchangeService } from './currency-exchange.service';
import { GetCurrencyPairDto } from './dto/GetCurrencyPairDto.dto';
import { PostExchangeTransactionDto } from './dto/PostExchangeTransaction.dto';

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
    return this.currencyExchangeService.getExchangeRate(
      currencyPairDto.currencyPair,
    );
  }

  @Post('exchange-transaction')
  async saveTransaction(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    currencyExchangeTransaction: PostExchangeTransactionDto,
  ) {
    return this.currencyExchangeService.create(currencyExchangeTransaction);
  }
}
