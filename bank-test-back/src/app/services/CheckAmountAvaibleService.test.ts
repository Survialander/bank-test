import { mocked } from 'ts-jest/utils';
import { getRepository, Repository } from 'typeorm';
import CheckAmountAvaibleService from './CheckAmountAvaibleService';

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

describe('Given CheckAmountAvaibleService', () => {
  let mockedAmount = 0;

  const accountRepo = {
    findOne: jest.fn(() => ({
      number: '123123',
      amount: mockedAmount,
    })),
  };

  it('should return true if amount is avaible', async () => {
    mockedAmount = 1000;
    mocked(getRepository).mockReturnValueOnce(accountRepo as unknown as Repository<unknown>);

    const response = await new CheckAmountAvaibleService().execute({ amount: 100, account_number: '123123' });

    expect(response).toBe(true);
  });

  it('should return Error if amount is not avaible', async () => {
    mockedAmount = 0;
    mocked(getRepository).mockReturnValueOnce(accountRepo as unknown as Repository<unknown>);

    try {
      await new CheckAmountAvaibleService().execute({ amount: 100, account_number: '123123' });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('balance is not enough');
    }
  });

  it('should return Error if account does not exists', async () => {
    accountRepo.findOne = jest.fn();
    mocked(getRepository).mockReturnValueOnce(accountRepo as unknown as Repository<unknown>);

    try {
      await new CheckAmountAvaibleService().execute({ amount: 100, account_number: '123123' });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('account does not exists');
    }
  });
});
