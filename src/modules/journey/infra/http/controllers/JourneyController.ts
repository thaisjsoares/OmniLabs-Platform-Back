import { Request, Response } from 'express'
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import CreateJourney from '@modules/journey/services/CreateJourney.Service';
import ShowJourneysOfCourse from '@modules/journey/services/ShowJourneysOfCourse.Service';
import ShowAllJourneys from '@modules/journey/services/ShowAllJourneys.Service';
import UpdateJourney from '@modules/journey/services/UpdateJourney.Service';
import RemoveJourney from '@modules/journey/services/RemoveJourney.Service';

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

    public async find(request: Request, response: Response): Promise<Response>{
        const { course_id } = request.params;

        const findJourneysByCourseId = container.resolve(ShowJourneysOfCourse);

        const journeys = await findJourneysByCourseId.execute(course_id)

        return response.json(classToClass(journeys))
    }

    public async show(request: Request, response: Response): Promise<Response>{
        const showAllJourneys = container.resolve(ShowAllJourneys);

        const journeys = await showAllJourneys.execute()

        return response.json(classToClass(journeys))
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { journey_id } = request.params;
        const { description, name, course_id } = request.body;

        const updateJourney = container.resolve(UpdateJourney);

        const journey = await updateJourney.execute({journey_id, description, name, course_id});

        return response.json(journey);
    }

    public async remove(request: Request, response: Response): Promise<Response> {
        const { journey_id } = request.params;

        const removeJourney = container.resolve(RemoveJourney);

        const journey = await removeJourney.execute(journey_id);

        return response.json(journey);
    }
}

export default JourneyController
