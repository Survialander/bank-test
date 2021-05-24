import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne, BeforeInsert,
  OneToMany,
} from 'typeorm';
import { v4 } from 'uuid';
import Transaction from './Transaction';

import User from './User';

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User, (user: User) => user.account_id)
  public user: User;

  @OneToMany(() => Transaction, (transaction: Transaction) => transaction.account_number)
  public transactions: Transaction;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }
}

export { Account };
