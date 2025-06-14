import { Module } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService]
})
export class CurrencyExchangeModule {}
