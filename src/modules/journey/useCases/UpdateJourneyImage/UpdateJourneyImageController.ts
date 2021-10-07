import UpdateJourneyImage from '@modules/journey/useCases/UpdateJourneyImage/UpdateJourneyImageUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UpdateJourneyImageController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { journey_id } = request.params;

        const imageName = request.file.filename;

        const updateJourneyImage = container.resolve(UpdateJourneyImage);

        const journey = await updateJourneyImage.execute({
            journey_id,
            imageName,
        });

        return response.json(classToClass(journey));
    }
}

export default UpdateJourneyImageController;
