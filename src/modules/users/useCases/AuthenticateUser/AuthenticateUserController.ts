import { AuthenticateUserUseCase } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserUseCase);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({ user: classToClass(user), token });
    }
}
