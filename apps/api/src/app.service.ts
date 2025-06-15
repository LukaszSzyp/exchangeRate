import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async getCacheKey<T = unknown>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get(key);
  }

  async setCacheKey<T = unknown>(
    key: string,
    value: T,
  ): Promise<T | undefined> {
    return await this.cacheManager.set(key, value);
  }
}
