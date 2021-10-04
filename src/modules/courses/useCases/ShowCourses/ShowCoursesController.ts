import { ShowCoursesUseCase } from '@modules/courses/useCases/ShowCourses/ShowCoursesUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ShowCoursesController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { page, limit } = request.query;

        const showCourses = container.resolve(ShowCoursesUseCase);

        const course = await showCourses.execute({
            page: Number(page),
            limit: Number(limit),
        });

        return response.json(classToClass(course));
    }
}
