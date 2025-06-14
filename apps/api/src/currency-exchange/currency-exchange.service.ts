import { Injectable } from '@nestjs/common';
import { GetCurrencyPairDto } from './dto/get-currency-exchange.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyExchangeService {
  constructor(private readonly httpService: HttpService,
    private configService: ConfigService
  ) {}


  getExchangeRate(currencyPair:GetCurrencyPairDto) {
    const key = this.configService.get<string>('CURRENCY_SERVICE_KEY');
    return this.httpService.axiosRef.get('https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api', { headers: {
      'x-api-key':key
    }})
  }
}
