import { ListSpecificLessonUseCase } from '@modules/lessons/useCases/ListSpecificLesson/ListSpecificLessonUsecase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListSpecificLessonController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { lesson_id } = request.params;

        const listSpecificLesson = container.resolve(ListSpecificLessonUseCase);

        const lesson = await listSpecificLesson.execute({ lesson_id });

        return response.json(classToClass(lesson));
    }
}

export { ListSpecificLessonController };
