import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getCacheKey(
    key: string,
  ): Promise<{ exchange_rate: number } | undefined> {
    return await this.cacheManager.get(key);
  }

  async setCacheKey(key: string, value: any): Promise<string | undefined> {
    return await this.cacheManager.set(key, value);
  }
}
