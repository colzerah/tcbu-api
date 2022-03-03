import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ id, code, name, birthDate }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      code,
      name,
      birthDate,
    });

    await this.repository.save(user);

    return user;
  }

  async findByCode(code: string): Promise<User> {
    const user = await this.repository.findOne({ code });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async list(page?: string): Promise<User[]> {
    if (page) {
      const take = Number(page) * 10;
      const users = await this.repository.find({ skip: 0, take });
      return users;
    }
    const users = await this.repository.find();

    return users;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersRepository };
