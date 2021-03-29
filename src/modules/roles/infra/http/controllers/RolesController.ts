import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoles from '@modules/roles/services/CreateRoles.service';
import ShoRoles from '@modules/roles/services/ShowRoles.service';
import DeleteRole from '@modules/roles/services/DeleteRole.service';

class RolesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name } = request.body;

        const createRole = container.resolve(CreateRoles);

        const role = await createRole.execute({
            name,
        });

        return response.json(role);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const showRoles = container.resolve(ShoRoles);

        const role = await showRoles.execute();

        return response.json(role);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { role_id } = request.params;

        const removeRole = container.resolve(DeleteRole);

        const role = await removeRole.execute({ role_id });

        return response.json(role);
    }
}

export default RolesController;
