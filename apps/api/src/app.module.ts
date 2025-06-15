import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { CurrencyExchange } from './currency-exchange/entities/currency-exchange-transaction.entity';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
      max: 100,
      store: 'memory',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: configService.get('DB_SCHEMA'),
        entities: [CurrencyExchange],
        synchronize: true,
      }),
    }),
    CurrencyExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
