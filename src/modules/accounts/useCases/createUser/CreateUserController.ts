import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, code, birthDate } = request.body;

    const createUserCase = container.resolve(CreateUserUseCase);

    const user = await createUserCase.execute({
      code,
      name,
      birthDate,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
