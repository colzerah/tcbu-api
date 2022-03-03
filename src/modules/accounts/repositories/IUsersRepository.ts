import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByCode(code: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(page?: string): Promise<User[]>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
