import { UpdateCourseUseCase } from '@modules/courses/useCases/UpdateCourse/UpdateCourseUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateCourseController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, description } = request.body;
        const { course_id } = request.params;

        const updateCourse = container.resolve(UpdateCourseUseCase);

        const course = await updateCourse.execute({
            name,
            description,
            course_id,
        });

        return response.json(classToClass(course));
    }
}
