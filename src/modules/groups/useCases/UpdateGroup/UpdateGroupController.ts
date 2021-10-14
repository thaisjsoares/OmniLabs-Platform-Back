import { UpdateGroupUseCase } from '@modules/groups/useCases/UpdateGroup/UpdateGroupUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateGroupController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { group_id } = request.params;
        const { name, description, course_id } = request.body;

        const updateGroup = container.resolve(UpdateGroupUseCase);

        const group = await updateGroup.execute({
            group_id,
            name,
            description,
            course_id,
        });

        return response.json(group);
    }
}

export { UpdateGroupController };
