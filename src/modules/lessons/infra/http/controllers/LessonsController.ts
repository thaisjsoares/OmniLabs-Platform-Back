import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLesson from '@modules/lessons/services/CreateLesson.service';
import ListLessonsOfJourney from '@modules/lessons/services/ListLessonsOfJourney.service';
import ListSpecificLesson from '@modules/lessons/services/ListSpecificLesson.service';

import { classToClass } from 'class-transformer';

class LessonsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            type,
            group_id,
            title,
            duration,
            description,
            resource,
            released_at,
            platform,
            name,
            link,
        } = request.body;

        const createLesson = container.resolve(CreateLesson);

        const lesson = await createLesson.execute({
            type,
            group_id,
            title,
            duration,
            description,
            resource,
            released_at,
            platform,
            name,
            link,
        });

        return response.json(classToClass(lesson));
    }

    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { journey_name } = request.params;

        const listLessonsOfJourney = container.resolve(ListLessonsOfJourney);

        const lesson = await listLessonsOfJourney.execute({ journey_name });

        return response.json(classToClass(lesson));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { lesson_id } = request.params;

        const createLesson = container.resolve(ListSpecificLesson);

        const lesson = await createLesson.execute({ lesson_id });

        return response.json(classToClass(lesson));
    }
}

export default LessonsController;
