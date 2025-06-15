import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SupportedCurrencyPair } from '../dto/GetCurrencyPairDto.dto';

@Entity()
export class CurrencyExchange {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ type: 'numeric', scale: 2 })
  amount: string;

  @Column({ type: 'numeric', scale: 2 })
  equivalent: string;

  @Column({
    name: 'currency_pair',
    type: 'text',
  })
  currencyPair: SupportedCurrencyPair;

  @Column({ type: 'numeric', scale: 4 })
  currencyRate: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
