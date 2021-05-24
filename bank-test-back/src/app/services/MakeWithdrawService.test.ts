import { mocked } from 'ts-jest/utils';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import Transaction from '../entities/Transaction';
import CreateTransactionService from './CreateTransactionService';
import MakeWithdrawService from './MakeWithdrawService';

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

describe('Given MakeWithdrawService', () => {
  const withdraw = {
    description: 'payment',
    account_number: '123123',
    amount: 100,
    type: 'payment',
  };

  let mockedAmount = 1000;

  const accountRepo = {
    decreaseBalance: jest.fn(),
  };

  const getRepoMock = {
    findOne: jest.fn(() => ({
      number: '123123',
      amount: mockedAmount,
    })),
  };

  beforeEach(() => {
    jest.spyOn(CreateTransactionService.prototype, 'execute').mockReturnValue(withdraw as unknown as Promise<Transaction>);
  });

  it('should make a payment', async () => {
    mocked(getCustomRepository).mockReturnValueOnce(accountRepo);
    mocked(getRepository).mockReturnValueOnce(getRepoMock as unknown as Repository<unknown>);
    const response = await new MakeWithdrawService().execute(withdraw);

    expect(accountRepo.decreaseBalance).toBeCalledWith({
      account_number: withdraw.account_number,
      amount: withdraw.amount,
    });
    expect(CreateTransactionService.prototype.execute).toBeCalledTimes(1);
    expect(response).toBe(withdraw);
  });

  it('should return an error if amount is not avaible', async () => {
    mockedAmount = 0;
    mocked(getCustomRepository).mockReturnValueOnce(accountRepo);
    mocked(getRepository).mockReturnValueOnce(getRepoMock as unknown as Repository<unknown>);

    try {
      await new MakeWithdrawService().execute(withdraw);
    } catch (error) {
      expect(error.message).toBe('balance is not enough');
    }
  });
});
