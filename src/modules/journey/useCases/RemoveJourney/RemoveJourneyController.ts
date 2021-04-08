import RemoveJourney from '@modules/journey/useCases/RemoveJourney/RemoveJourneyUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class RemoveJourneyController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { journey_id } = request.params;

        const removeJourney = container.resolve(RemoveJourney);

        const journey = await removeJourney.execute(journey_id);

        return response.json(journey);
    }
}

export default RemoveJourneyController;
