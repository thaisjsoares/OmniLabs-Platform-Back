import { ShowGroupsOfJourneyUseCase } from '@modules/groups/useCases/ShowGroupsOfJourney/ShowGroupsOfJourneyUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowGroupsOfJourneyController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { journey_id } = request.params;

        const showGroupsOfJourney = container.resolve(
            ShowGroupsOfJourneyUseCase,
        );

        const groups = await showGroupsOfJourney.execute({ journey_id });

        return response.json(groups);
    }
}

export { ShowGroupsOfJourneyController };
