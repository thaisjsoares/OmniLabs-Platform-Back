import { ShowLessonsOfCourseUseCase } from '@modules/lessons/useCases/ShowLessonsOfCourse/ShowLessonsOfCourseUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowLessonsOfCourseController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { course_id } = request.params;

        const showLessonsOfCourse = container.resolve(
            ShowLessonsOfCourseUseCase,
        );

        const lesson = await showLessonsOfCourse.execute({ course_id });

        return response.json(classToClass(lesson));
    }
}

export { ShowLessonsOfCourseController };
