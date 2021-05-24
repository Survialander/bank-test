import { getRepository, getCustomRepository } from 'typeorm';
import User from '../entities/User';
import AccountsRepository from '../repositories/AccountsRepository';

interface Request {
  name: string,
  email: string,
}

class CreateUserService {
  public async execute({ name, email }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const accountsRepository = getCustomRepository(AccountsRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw Error('email already exists');
    }

    const account = await accountsRepository.createAccount();
    const user = usersRepository.create({ name, email, account_id: account.id });

    return usersRepository.save(user);
  }
}

export default CreateUserService;
