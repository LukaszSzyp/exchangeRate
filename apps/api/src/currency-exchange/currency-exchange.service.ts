import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetCurrencyPairDto } from './dto/get-currency-exchange.dto';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getExchangeRate(currencyPairDto: GetCurrencyPairDto) {
    const apiKey = this.configService.get<string>('CURRENCY_SERVICE_KEY');
    if (!apiKey) {
      throw new Error('CURRENCY_SERVICE_KEY not set');
    }
    try {
      const { data } = await this.httpService.axiosRef.get(
        'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api',
        {
          headers: { 'x-api-key': apiKey },
          params: { currencyPair: currencyPairDto.currencyPair },
        },
      );
      return data;
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }
}
