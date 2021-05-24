import { getRepository } from 'typeorm';
import { Account } from '../entities/Account';

interface Request {
  amount: number,
  account_number: string
}

class CheckAmountAvaibleService {
  public async execute({ amount, account_number }: Request): Promise<boolean> {
    const accountRepository = getRepository(Account);

    const account = await accountRepository.findOne({ number: account_number });

    if (!account) {
      throw new Error('account does not exists');
    }

    if (account.amount < amount) {
      throw new Error('balance is not enough');
    }

    return true;
  }
}

export default CheckAmountAvaibleService;
