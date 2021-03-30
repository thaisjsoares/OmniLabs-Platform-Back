import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteRole from '@modules/roles/useCases/deleteRole/DeleteRoleUseCase';

class RolesController {
    public async handle(
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
