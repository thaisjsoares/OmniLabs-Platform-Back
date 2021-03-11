import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateJourney from '@modules/journey/services/CreateJourney.Service';

class JourneyController {
    public async create(request: Request, response: Response): Promise<Response>{
        const { name, description, course_id } = request.body;

        const createJourney = container.resolve(CreateJourney);

        const journey = await createJourney.execute({
            name,
            description,
            course_id
        })

        return response.json(journey)
    }
}

export default JourneyController
