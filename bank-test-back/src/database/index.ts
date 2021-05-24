import { createConnection } from 'typeorm';

createConnection();
// .finally(async () => {
//   const usersRepo = getRepository(User);
//   const usersExists = await usersRepo.findOne();

//   if (!usersExists) {
//     const createUsersScript = new CreateUsersScript();
//     await createUsersScript.execute();
//   }
// });
