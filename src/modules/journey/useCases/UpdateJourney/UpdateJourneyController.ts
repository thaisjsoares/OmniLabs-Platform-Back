import UpdateJourney from '@modules/journey/useCases/UpdateJourney/UpdateJourneyUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateJourneyController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { journey_id } = request.params;
        const { description, name, course_id } = request.body;

        const updateJourney = container.resolve(UpdateJourney);

        const journey = await updateJourney.execute({
            journey_id,
            description,
            name,
            course_id,
        });

        return response.json(journey);
    }
}

export default UpdateJourneyController;
