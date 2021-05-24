import { mocked } from 'ts-jest/utils';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import CreateUserService from './CreateUserService';

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

describe('given CreateUserService', () => {
  const user = {
    name: 'teste',
    email: 'email@test.com',
    account_id: '123',
  };

  let mockedFindOne = jest.fn();
  const mockedSave = jest.fn(() => (user));
  const mockedCreate = jest.fn();

  const userRepo = {
    findOne: mockedFindOne,
    create: mockedCreate,
    save: mockedSave,
  };

  const accountRepo = {
    createAccount: jest.fn(() => ({
      id: '12345',
    })),
  };

  beforeAll(() => {
    mocked(getRepository).mockReturnValue(userRepo as unknown as Repository<unknown>);
    mocked(getCustomRepository).mockReturnValue(accountRepo as unknown as Repository<unknown>);
  });

  it('should create an user', async () => {
    const response = await new CreateUserService().execute({ name: 'teste', email: 'teste@teste.com' });

    expect(response).toEqual(user);
  });

  it('should return an Error when user already exists', async () => {
    mockedFindOne = jest.fn(() => (user));

    try {
      await new CreateUserService().execute({ name: 'teste', email: 'teste@teste.com' });
    } catch (error) {
      expect(error.message).toBe('email already exists');
    }
  });
});
