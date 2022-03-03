import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  photo: Express.Multer.File;
  id: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRerpositoy: IUsersRepository
  ) {}

  async execute({ photo, id }: IRequest): Promise<User> {
    const user = await this.usersRerpositoy.findById(id);

    const imageAsBase64 = fs.readFileSync(photo.path, 'base64');

    user.photo = `data:image/png;base64, ${imageAsBase64}`;

    await this.usersRerpositoy.create(user);

    return user;
  }
}

export { UpdateAvatarUseCase };
