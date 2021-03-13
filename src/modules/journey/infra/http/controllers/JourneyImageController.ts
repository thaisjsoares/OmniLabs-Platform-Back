import { Request, Response } from 'express'
import { container } from 'tsyringe';

import UpdateJourneyImage from '@modules/journey/services/UpdateJourneyImage.Service';
import { classToClass } from 'class-transformer';

class JourneyImageController {
    public async update(request: Request, response: Response): Promise<Response>{
        const { journey_id } = request.params;

        const imageName = request.file.filename;

        const updateJourneyImage = container.resolve(UpdateJourneyImage);

        const journey = await updateJourneyImage.execute({
            journey_id,
            imageName
        })

        return response.json(classToClass(journey))
    }

}

export default JourneyImageController
