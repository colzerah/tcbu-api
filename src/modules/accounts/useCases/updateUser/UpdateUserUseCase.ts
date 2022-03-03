import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  code: string;
  name: string;
  birthDate: Date;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRerpositoy: IUsersRepository
  ) {}

  async execute({ id, code, name, birthDate }: IRequest): Promise<User> {
    const user = await this.usersRerpositoy.findById(id);

    user.code = code;
    user.name = name;
    user.birthDate = birthDate;

    await this.usersRerpositoy.create(user);

    return user;
  }
}

export { UpdateUserUseCase };
