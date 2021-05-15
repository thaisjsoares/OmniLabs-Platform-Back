import { DeleteGroupUseCase } from '@modules/groups/useCases/DeleteGroup/DeleteGroupUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DeleteGroupController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { group_id } = request.params;

        const deleteGroup = container.resolve(DeleteGroupUseCase);

        const group = await deleteGroup.execute({ group_id });

        return response.json(group);
    }
}

export { DeleteGroupController };
