import { RemoveCoruseUseCase } from '@modules/courses/useCases/RemoveCourse/RemoveCoursesUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class RemoveCourseController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { couse_id } = request.params;

        const removeCourse = container.resolve(RemoveCoruseUseCase);

        const course = await removeCourse.execute(couse_id);

        return response.json(classToClass(course));
    }
}
