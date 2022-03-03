import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersUseCase } from './ListUsersUseCase';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;
    const createUserUseCase = container.resolve(ListUsersUseCase);
    const all = await createUserUseCase.execute(page);

    return response.json(all);
  }
}

export { ListUsersController };
