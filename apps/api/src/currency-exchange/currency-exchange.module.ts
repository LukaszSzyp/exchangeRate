import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { CurrencyExchangeService } from './currency-exchange.service';

@Module({
  imports: [HttpModule],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
