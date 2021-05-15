import { UpdateProfileUseCase } from '@modules/users/useCases/UpdateProfile/UpdateProfileUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateProfileController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;

        const udpateProfile = container.resolve(UpdateProfileUseCase);

        const user = await udpateProfile.execute({
            // tem que ser await pois o método execute é async
            user_id,
            name,
            email,
            old_password,
            password,
        });

        return response.json(classToClass(user));
    }
}
