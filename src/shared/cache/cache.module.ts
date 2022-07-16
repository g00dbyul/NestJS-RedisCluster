import { CacheModule, Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/app.config.service';
import { CacheService } from './cache.service';

export interface RedisModuleOptions {
  host: string;
  port: number;
  ttl: number;
}

@Global()
@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (appConfigService:AppConfigService) => ({
        store: redisStore,
        clusterConfig: {
          nodes: [appConfigService.redisConfig],
        }
      }),
      inject: [AppConfigService]
    })
  ],
  providers: [CacheService],
  exports: [CacheService]
})
export class RedisCacheModule {}
