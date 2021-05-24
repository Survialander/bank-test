import { EntityRepository, Repository } from 'typeorm';
import { Account } from '../entities/Account';
import { ModifyBalanceDTO } from './interfaces/AccountRepositoryDTO';

@EntityRepository(Account)
class AccountsRepository extends Repository<Account> {
  public async createAccount(): Promise<Account> {
    const number = String(Math.random().toString(10).substr(2).slice(1, 7));

    const account = this.create({
      number,
    });

    return this.save(account);
  }

  public async getAmmount(account_number: string): Promise<number> {
    const { amount } = await this.findOne({ number: account_number });

    return amount;
  }

  public async decreaseBalance({ account_number, amount }: ModifyBalanceDTO): Promise<Account> {
    const account = await this.findOne({ number: account_number });
    const accountAmountNumber = Number(account.amount);
    account.amount = accountAmountNumber - amount;

    return this.save(account);
  }

  public async increaseBalance({ account_number, amount }: ModifyBalanceDTO): Promise<Account> {
    const account = await this.findOne({ number: account_number });
    const accountAmountNumber = Number(account.amount);
    account.amount = accountAmountNumber + amount;

    return this.save(account);
  }
}

export default AccountsRepository;
