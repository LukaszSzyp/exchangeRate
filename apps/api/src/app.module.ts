import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
      max: 100,
      store: 'memory',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CurrencyExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
