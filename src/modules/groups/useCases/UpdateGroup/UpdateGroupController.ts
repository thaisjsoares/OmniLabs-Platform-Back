import { UpdateGroupUseCase } from '@modules/groups/useCases/UpdateGroup/UpdateGroupUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateGroupController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { group_id } = request.params;
        const { name, description, journey_id } = request.body;

        const updateGroup = container.resolve(UpdateGroupUseCase);

        const group = await updateGroup.execute({
            group_id,
            name,
            description,
            journey_id,
        });

        return response.json(group);
    }
}

export { UpdateGroupController };
