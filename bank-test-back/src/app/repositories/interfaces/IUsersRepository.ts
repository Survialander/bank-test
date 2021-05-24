export interface ICreateUserDTO {
  name: string;
  email: string;
}

export interface IUsersRepository {
  create({ name, email }: ICreateUserDTO): Promise<void>;
}