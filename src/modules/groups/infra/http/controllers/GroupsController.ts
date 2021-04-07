import CreateGroup from '@modules/groups/services/CreateGroup.service';
import DeleteGroup from '@modules/groups/services/DeleteGroup.service';
import ShowGroups from '@modules/groups/services/ShowGroups.service';
import UpdateGroup from '@modules/groups/services/UpdateGroup.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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

    public async show(request: Request, response: Response): Promise<Response> {
        const showGroups = container.resolve(ShowGroups);

        const gruops = await showGroups.execute();

        return response.json(gruops);
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { group_id } = request.params;

        const deleteGroup = container.resolve(DeleteGroup);

        const group = await deleteGroup.execute({ group_id });

        return response.json(group);
    }

    public async edit(request: Request, response: Response): Promise<Response> {
        const { group_id } = request.params;
        const { name, description, journey_id } = request.body;

        const updateGroup = container.resolve(UpdateGroup);

        const group = await updateGroup.execute({
            group_id,
            name,
            description,
            journey_id,
        });

        return response.json(group);
    }
}

export default GroupsController;
