import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyExchangeController } from './currency-exchange.controller';
import { CurrencyExchangeService } from './currency-exchange.service';

describe('CurrencyExchangeController', () => {
  let controller: CurrencyExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyExchangeController],
      providers: [CurrencyExchangeService],
    }).compile();

    controller = module.get<CurrencyExchangeController>(CurrencyExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
