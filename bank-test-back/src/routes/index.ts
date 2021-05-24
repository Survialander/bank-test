import { Router } from 'express';
import createUsers from '../app/scripts/createUsers';
import transactionsRouter from './transactions.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/transactions', transactionsRouter);
routes.get('/seed', async (request, response) => {
  await createUsers.execute();
  response.json({
    message: 'Seeder executado com sucesso, acesse o endereço http://localhost:8080.',
  });
});

export default routes;
