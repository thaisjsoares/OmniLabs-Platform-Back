import { CreateCoursesUseCase } from '@modules/courses/useCases/CreateCourses/CreateCoursesUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class CreateCoursesController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createCourse = container.resolve(CreateCoursesUseCase);

        const { name, description } = request.body;

        const course = await createCourse.execute({ name, description });

        return response.json(classToClass(course));
    }
}
