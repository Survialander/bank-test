import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../app/entities/User';

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

export default userRouter;
