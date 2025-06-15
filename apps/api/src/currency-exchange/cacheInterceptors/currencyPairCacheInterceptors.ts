import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    ExecutionContext,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class CurrencyPairCacheInterceptors extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const currencyPair = request.query.currencyPair;
    return `rate_${currencyPair}`;
  }
}
