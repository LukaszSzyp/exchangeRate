import { Module } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[HttpModule,ConfigModule.forRoot()],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService]
})
export class CurrencyExchangeModule {}
