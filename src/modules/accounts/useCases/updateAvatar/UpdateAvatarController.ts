import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAvatarUseCase } from './UpdateAvatarUseCase';

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const photo = request.file;

    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    const user = await updateAvatarUseCase.execute({
      photo,
      id,
    });

    return response.status(201).json(user);
  }
}
export { UpdateAvatarController };
