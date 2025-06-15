import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { SupportedCurrencyPair } from '../dto/GetCurrencyPairDto.dto';

export const createCacheRateKey = (currencyPair: SupportedCurrencyPair) =>
  `rate_${currencyPair}`;

@Injectable()
export class CurrencyPairCacheInterceptors extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const currencyPair = request.query.currencyPair;
    return createCacheRateKey(currencyPair);
  }
}
