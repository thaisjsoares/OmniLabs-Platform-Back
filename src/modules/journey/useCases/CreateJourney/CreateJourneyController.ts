import CreateJourney from '@modules/journey/useCases/CreateJourney/CreateJourneyUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateJourneyController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, description, course_id } = request.body;

        const createJourney = container.resolve(CreateJourney);

        const journey = await createJourney.execute({
            name,
            description,
            course_id,
        });

        return response.json(journey);
    }
}

export default CreateJourneyController;
