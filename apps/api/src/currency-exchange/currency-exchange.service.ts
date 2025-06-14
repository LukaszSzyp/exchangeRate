import { Injectable } from '@nestjs/common';
import { GetCurrencyPairDto } from './dto/get-currency-exchange.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyExchangeService {
  constructor(private readonly httpService: HttpService,
    private configService: ConfigService
  ) {}


  async getExchangeRate(currencyPairDto: GetCurrencyPairDto) {
    const apiKey = this.configService.get<string>('CURRENCY_SERVICE_KEY');
    if (!apiKey) {
      throw new Error('CURRENCY_SERVICE_KEY not set');
    }

    return this.httpService.axiosRef.get(
      'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api',
      {
        headers: { 'x-api-key': apiKey },
        params: { currencyPair: currencyPairDto.currencyPair },
      },
    );
   }
}
