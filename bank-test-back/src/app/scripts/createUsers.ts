import { getRepository } from 'typeorm';
import { Account } from '../entities/Account';
import User from '../entities/User';

const users = [
  {
    name: 'Jhon Doe',
    email: 'jhondoe@email.com',
    account_id: '',
  },
  {
    name: 'Kenny',
    email: 'kenny@email.com',
    account_id: '',
  },
];

const accounts = [
  {
    number: '110330',
    amount: 0,
  },
  {
    number: '1302204',
    amount: 0,
  },
];

class CreateUsers {
  public async execute(): Promise<void> {
    const accountsRepo = getRepository(Account);
    const usersRepo = getRepository(User);

    accounts.forEach(async (account, i) => {
      const accountEntity = accountsRepo.create(account);
      accountsRepo.save(accountEntity)
        .then(async (data) => {
          users[i].account_id = data.id;

          const user = usersRepo.create(users[i]);

          return usersRepo.save(user);
        });
    });
  }
}

export default new CreateUsers();
