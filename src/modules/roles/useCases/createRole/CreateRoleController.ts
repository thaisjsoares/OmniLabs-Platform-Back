import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRoles from '@modules/roles/useCases/createRole/CreateRoleUseCase';

class RolesController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { name } = request.body;

            const createRole = container.resolve(CreateRoles);

            const role = await createRole.execute({
                name,
            });

            return response.status(201).json(role);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export default RolesController;
