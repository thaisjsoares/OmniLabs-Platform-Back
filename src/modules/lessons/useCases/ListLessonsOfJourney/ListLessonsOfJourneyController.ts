import { ListLessonOfCourseUseCase } from '@modules/lessons/useCases/ListLessonsOfJourney/ListLessonsOfJourneyUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListLessonsOfJourneyController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { journey_name } = request.params;

        const listLessonsOfJourney = container.resolve(
            ListLessonOfCourseUseCase,
        );

        const lesson = await listLessonsOfJourney.execute({ journey_name });

        return response.json(classToClass(lesson));
    }
}

export { ListLessonsOfJourneyController };
