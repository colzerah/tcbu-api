import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ code, name, birthDate }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByCode(code);

    if (userAlreadyExists) throw new AppError('User already exists');

    const user = await this.usersRepository.create({
      code,
      name,
      birthDate,
    });

    return user;
  }
}

export { CreateUserUseCase };
