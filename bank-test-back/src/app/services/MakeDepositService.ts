import { getCustomRepository } from 'typeorm';
import Transaction from '../entities/Transaction';
import AccountsRepository from '../repositories/AccountsRepository';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  amount: number,
  account_number: string,
  description: string,
  type: string,
}

class MakeDepositService {
  public async execute({
    amount, account_number, type, description,
  }: Request): Promise<Transaction> {
    const createTransaction = new CreateTransactionService();
    const accountRepo = getCustomRepository(AccountsRepository);

    await accountRepo.increaseBalance({ account_number, amount });

    const transaction = createTransaction.execute({
      description, type, amount, account_number,
    });

    return transaction;
  }
}

export default MakeDepositService;
