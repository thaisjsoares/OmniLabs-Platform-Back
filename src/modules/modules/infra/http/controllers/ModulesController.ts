import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateModule from '@modules/modules/services/CreateModule.service';

class ModulesController {
    public async create(request: Request, response: Response): Promise<Response>{
        const { name, description, journey_id } = request.body;

        const createModule = container.resolve(CreateModule);

        const module = await createModule.execute({
            name,
            description,
            journey_id
        })

        return response.json(module)
    }
}

export default ModulesController
