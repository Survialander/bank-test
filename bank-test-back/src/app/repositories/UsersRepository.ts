import { Repository, EntityRepository } from 'typeorm';
import User from '../entities/User';
import { ICreateUserDTO } from './interfaces/IUsersRepository';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async createUser({ name, email }: ICreateUserDTO): Promise<void> {
    const user = this.create({
      name,
      email,
    });

    await this.save(user);
  }
}

export { UsersRepository };
