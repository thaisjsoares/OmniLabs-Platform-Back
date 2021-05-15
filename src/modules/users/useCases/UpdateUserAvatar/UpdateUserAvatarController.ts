import { UpdateUserAvatarUseCase } from '@modules/users/useCases/UpdateUserAvatar/UpdateUserAvatarUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateUserAvatarController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(classToClass(user));
    }
}
