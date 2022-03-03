import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const createUserUseCase = container.resolve(DeleteUserUseCase);
    await createUserUseCase.execute(id as string);

    return response.status(201).send();
  }
}

export { DeleteUserController };
