import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { CurrencyExchangeService } from './currency-exchange.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyExchange } from './entities/currency-exchange-transaction.entity';
import { AppService } from 'src/app.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([CurrencyExchange])],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService, AppService],
})
export class CurrencyExchangeModule {}
