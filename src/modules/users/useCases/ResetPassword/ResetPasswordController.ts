import { ResetPasswordUseCase } from '@modules/users/useCases/ResetPassword/ResetPasswordUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ResetPasswordController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;

        const resetPassword = container.resolve(ResetPasswordUseCase);

        await resetPassword.execute({
            token,
            password,
        });

        return response.status(204).json();
    }
}
