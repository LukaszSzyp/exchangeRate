import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { ConfigModule } from '@nestjs/config';

 @Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CurrencyExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
