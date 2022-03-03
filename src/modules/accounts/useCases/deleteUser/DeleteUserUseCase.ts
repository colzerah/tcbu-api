import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '@utils/file';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User do not exists');

    if (user.photo) await deleteFile(`./tmp/photo/${user.photo}`);

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
