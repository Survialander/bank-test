import { mocked } from 'ts-jest/utils';
import { getRepository, Repository } from 'typeorm';
import CreateTransactionService from './CreateTransactionService';

jest.mock('typeorm', () => ({
  getRepository: jest.fn(),
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

describe('given CreateTransactionService', () => {
  const transaction = {
    description: 'teste', account_number: '1234', amount: 1000, type: 'deposit',
  };

  const mockedSave = jest.fn(() => (transaction));
  const mockedCreate = jest.fn(() => (transaction));

  const transactionRepo = {
    save: mockedSave,
    create: mockedCreate,
  };

  it('should create a transaction', async () => {
    mocked(getRepository).mockReturnValueOnce(transactionRepo as unknown as Repository<unknown>);

    const response = await new CreateTransactionService().execute(transaction);

    expect(mockedCreate).toBeCalledWith(transaction);
    expect(mockedSave).toBeCalledWith(transaction);
    expect(response).toEqual(transaction);
  });
});
