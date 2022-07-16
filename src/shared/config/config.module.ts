import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppConfigService } from './app.config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.valid('development'),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        REDIS_TTL: Joi.string().required()
      })
    })
  ],
  providers: [AppConfigService],
  exports: [NestConfigModule, AppConfigService]
})
export class ConfigModule {}
