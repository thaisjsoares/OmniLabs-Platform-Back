import { ShowProfileUseCase } from '@modules/users/useCases/ShowProfile/ShowProfileUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        // exibição do perfil

        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileUseCase);

        const user = await showProfile.execute({ user_id });

        return response.json(classToClass(user));
    }
}
