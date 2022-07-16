import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions } from '../cache/cache.module';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  get redisConfig(): RedisModuleOptions {
    return {
      host: this.getString('REDIS_HOST'),
      port: this.getNumber('REDIS_PORT'),
      ttl: this.getNumber('REDIS_TTL')
    }
  }
}
