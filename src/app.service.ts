import { Injectable } from '@nestjs/common';
import { CacheService } from './shared/cache/cache.service';

@Injectable()
export class AppService {
  constructor(private readonly cacheService: CacheService) {}

  async getInfo(key: string): Promise<any> {
    return await this.cacheService.get(key)
  }

  async createInfo(key: string, value: any): Promise<boolean> {
    await this.cacheService.set(key, value)
    const getData = await this.cacheService.get(key)
    if(getData && getData === value) {
      return true
    }
    return false
  }

  async deleteInfo(key: string): Promise<boolean> {
    await this.cacheService.delete(key)
    const getData = await this.cacheService.get(key)
    if(!getData) {
      return true
    }
    return false
  }
}
