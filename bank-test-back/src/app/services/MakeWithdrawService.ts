import { getCustomRepository } from 'typeorm';
import Transaction from '../entities/Transaction';
import AccountsRepository from '../repositories/AccountsRepository';
import CheckAmountAvaibleService from './CheckAmountAvaibleService';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  account_number: string,
  amount: number,
  description: string,
  type: string,
}

class MakeWithdrawService {
  public async execute({
    account_number, amount, description, type,
  }: Request): Promise<Transaction> {
    const accountsRepository = getCustomRepository(AccountsRepository);
    const checkAmount = new CheckAmountAvaibleService();
    const createTransaction = new CreateTransactionService();

    await checkAmount.execute({ amount, account_number });

    await accountsRepository.decreaseBalance({ account_number, amount });
    const transaction = await createTransaction.execute({
      description, type, amount, account_number,
    });

    return transaction;
  }
}

export default MakeWithdrawService;
