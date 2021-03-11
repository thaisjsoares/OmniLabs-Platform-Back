import { Request, Response } from 'express'
import { container } from 'tsyringe';

import CreateJourney from '@modules/journey/services/CreateJourney.Service';
import ShowJourneysOfCourse from '@modules/journey/services/ShowJourneysOfCourse.Service';

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

    public async show(request: Request, response: Response): Promise<Response>{
        const { course_id } = request.params;

        const findJourneysByCourseId = container.resolve(ShowJourneysOfCourse);

        const journeys = await findJourneysByCourseId.execute(course_id)

        return response.json(journeys)
    }
}

export default JourneyController
