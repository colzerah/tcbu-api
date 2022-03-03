import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IResponse {
  users: User[];
  usersAmount: number;
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(page: string): Promise<IResponse> {
    const users = await this.usersRepository.list(page);
    const usersAmount = await this.usersRepository.list();

    return { users, usersAmount: usersAmount.length };
  }
}

export { ListUsersUseCase };
