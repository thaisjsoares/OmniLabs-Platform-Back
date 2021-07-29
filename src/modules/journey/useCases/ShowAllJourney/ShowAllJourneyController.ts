import ShowAllJourneys from '@modules/journey/useCases/ShowAllJourney/ShowAllJourneysUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowAllJourneyController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const showAllJourneys = container.resolve(ShowAllJourneys);

        const journeys = await showAllJourneys.execute();

        return response.json(classToClass(journeys));
    }
}

export default ShowAllJourneyController;
