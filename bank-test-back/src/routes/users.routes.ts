import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../app/entities/User';
import CreateUserService from '../app/services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  try {
    const userRepo = getRepository(User);
    const data = await userRepo.findOne();

    response.json(data);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

userRouter.post('/', async (request, response) => {
  try {
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name: 'jhon doe', email: 'jhondoe@email.com.br' });

    return response.json(user);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default userRouter;
