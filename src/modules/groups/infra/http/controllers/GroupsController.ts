import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGroup from '@modules/groups/services/CreateGroup.service';

class GroupsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, description, journey_id } = request.body;

        const createGroup = container.resolve(CreateGroup);

        const group = await createGroup.execute({
            name,
            description,
            journey_id,
        });

        return response.json(group);
    }
}

export default GroupsController;
