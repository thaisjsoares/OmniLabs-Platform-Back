import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoles from '@modules/roles/services/CreateRoles.service';
import ShoRoles from '@modules/roles/services/ShowRoles.service';

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
        const showRles = container.resolve(ShoRoles);

        const role = await showRles.execute();

        return response.json(role);
    }
}

export default RolesController;
