import { CreateLessonUseCase } from '@modules/lessons/useCases/CreateLesson/CreateLessonUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateLessonController {
    public async handle(
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

        const createLesson = container.resolve(CreateLessonUseCase);

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
}

export { CreateLessonController };
