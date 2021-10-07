import { ShowGroupsUseCase } from '@modules/groups/useCases/ShowGroups/ShowGroupsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowGroupsController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const showGroups = container.resolve(ShowGroupsUseCase);

        const gruops = await showGroups.execute();

        return response.json(gruops);
    }
}

export { ShowGroupsController };
