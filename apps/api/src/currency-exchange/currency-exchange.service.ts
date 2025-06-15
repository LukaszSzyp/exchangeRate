import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { createCacheRateKey } from './cacheInterceptors/currencyPairCacheInterceptors';
import { SupportedCurrencyPair } from './dto/GetCurrencyPairDto.dto';
import { PostExchangeTransactionDto } from './dto/PostExchangeTransaction.dto';
import { CurrencyExchange } from './entities/currency-exchange-transaction.entity';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @InjectRepository(CurrencyExchange)
    private readonly exchangeTransactionRepo: Repository<CurrencyExchange>,
    private readonly appService: AppService,
  ) {}

  async getExchangeRate(currencyPair: SupportedCurrencyPair) {
    const apiKey = this.configService.get<string>('CURRENCY_SERVICE_KEY');
    if (!apiKey) {
      throw new Error('CURRENCY_SERVICE_KEY not set');
    }
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api',
        {
          headers: { 'x-api-key': apiKey },
          params: { currencyPair: currencyPair },
        },
      );
      return data;
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }

  async create(postExchangeTransactionDto: PostExchangeTransactionDto) {
    const { amount, currencyPair } = postExchangeTransactionDto;
    const cacheKey = createCacheRateKey(currencyPair);
    const cache = await this.appService.getCacheKey<{ exchange_rate: number }>(
      cacheKey,
    );
    let exchange_rate: number;

    if (cache) {
      exchange_rate = cache.exchange_rate;
    } else {
      const res = await this.getExchangeRate(currencyPair);
      exchange_rate = res.exchange_rate;
      await this.appService.setCacheKey(cacheKey, {
        exchange_rate: exchange_rate,
      });
    }

    const equivalent = (+amount / exchange_rate).toFixed(2);

    const exchangeTransaction = this.exchangeTransactionRepo.create({
      amount,
      equivalent,
      currencyPair,
      currencyRate: String(exchange_rate),
    });
    return await this.exchangeTransactionRepo.save(exchangeTransaction);
  }
}
