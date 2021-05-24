import { getRepository } from 'typeorm';
import Transaction from '../entities/Transaction';

interface Request {
  description: string,
  amount: number,
  account_number: string,
  type: string,
}

class CreateTransactionService {
  public execute({
    description, amount, type, account_number,
  }: Request): Promise<Transaction> {
    const transactionRepo = getRepository(Transaction);

    const transaction = transactionRepo.create({
      description, amount, type, account_number,
    });

    return transactionRepo.save(transaction);
  }
}

export default CreateTransactionService;
