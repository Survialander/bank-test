import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, BeforeInsert,
} from 'typeorm';
import { v4 } from 'uuid';
import { Account } from './Account';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  account_id: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Account, (account: Account) => account.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }
}

export default User;
