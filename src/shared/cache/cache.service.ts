import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string) {
    return await this.cache.get(key);
  }

  async set(key: string, value: any, ttl?: number) {
    await this.cache.set(key, value, { ttl })
  }

  async delete(key: string) {
    await this.cache.del(key)
  }
}
