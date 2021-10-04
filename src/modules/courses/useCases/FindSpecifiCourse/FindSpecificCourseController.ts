import { FindSpecificCourseUseCase } from '@modules/courses/useCases/FindSpecifiCourse/FindSpecificCourseUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class FindSpecificCourseController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { course_id } = request.params;

        const findCourse = container.resolve(FindSpecificCourseUseCase);

        const course = await findCourse.execute({
            course_id,
        });

        return response.json(classToClass(course));
    }
}
