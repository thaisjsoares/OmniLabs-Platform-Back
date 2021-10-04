import { CreateGroupUseCase } from '@modules/groups/useCases/CreateGroup/CreateGroupUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateGroupController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, description, journey_id } = request.body;

        const createGroup = container.resolve(CreateGroupUseCase);

        const group = await createGroup.execute({
            name,
            description,
            journey_id,
        });

        return response.json(group);
    }
}

export { CreateGroupController };
