import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShoRoles from '@modules/roles/useCases/showRoles/ShowRolesUseCase';

class RolesController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const showRoles = container.resolve(ShoRoles);

            const role = await showRoles.execute();

            return response.status(200).json(role);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export default RolesController;
