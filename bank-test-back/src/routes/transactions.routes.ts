import { Router } from 'express';
import { getRepository } from 'typeorm';
import Transaction from '../app/entities/Transaction';
import MakeDepositService from '../app/services/MakeDepositService';
import MakeWithdrawService from '../app/services/MakeWithdrawService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  try {
    let { account_number } = request.query;
    account_number = String(account_number);

    const transactionRepo = getRepository(Transaction);

    const transactions = await transactionRepo.find({ account_number });

    return response.json(transactions);
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    });
  }
});

transactionsRouter.post('/deposit', async (request, response) => {
  try {
    const {
      amount, account_number, description, type,
    } = request.body;

    const makeDeposit = new MakeDepositService();

    const transaction = await makeDeposit.execute({
      amount, account_number, type, description,
    });

    return response.json(transaction);
  } catch (error) {
    return response.status(400).json(error.message);
  }
});

transactionsRouter.post(['/withdraw', '/payment'], async (request, response) => {
  try {
    const {
      amount, account_number, description, type,
    } = request.body;

    const makeWithdraw = new MakeWithdrawService();

    const data = await makeWithdraw.execute({
      amount, account_number, type, description,
    });

    return response.json(data);
  } catch (error) {
    return response.status(400).json(error.message);
  }
});

export default transactionsRouter;
