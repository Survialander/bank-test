import { mocked } from 'ts-jest/utils';
import { getCustomRepository } from 'typeorm';
import MakeDepositService from './MakeDepositService';
import CreateTransactionService from './CreateTransactionService';
import Transaction from '../entities/Transaction';

jest.mock('typeorm', () => ({
  getRepository: jest.fn(),
  getCustomRepository: jest.fn(),
  Repository: jest.fn(),
  EntityRepository: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  Entity: jest.fn(),
  CreateDateColumn: jest.fn(),
  ManyToOne: jest.fn(),
  JoinColumn: jest.fn(),
  BeforeInsert: jest.fn(),
  OneToOne: jest.fn(),
  OneToMany: jest.fn(),
}));

describe('Given MakeDepositService', () => {
  const accountRepo = {
    increaseBalance: jest.fn(),
  };

  const request = {
    amount: 300,
    account_number: '1234',
    type: 'deposit',
    description: 'description',
  };

  beforeAll(() => {
    jest.spyOn(CreateTransactionService.prototype, 'execute').mockReturnValue(request as unknown as Promise<Transaction>);
    mocked(getCustomRepository).mockReturnValue(accountRepo);
  });

  it('should call method increaseBalance', async () => {
    await new MakeDepositService().execute(request);

    expect(accountRepo.increaseBalance).toBeCalledTimes(1);
  });

  it('should create a transaction', async () => {
    const response = await new MakeDepositService().execute(request);

    expect(response).toBe(request);
  });
});
