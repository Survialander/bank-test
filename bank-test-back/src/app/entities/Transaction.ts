import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, JoinColumn,
} from 'typeorm';
import { v4 } from 'uuid';
import { Account } from './Account';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @Column()
  account_number: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Account, (account: Account) => account.number)
  @JoinColumn({ name: 'account_number' })
  public account: Account;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }
}

export default Transaction;
