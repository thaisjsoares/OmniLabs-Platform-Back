import { UpdateCoursesImageUseCase } from '@modules/courses/useCases/UpdateCourseImage/UpdateCoursesImageUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UpdateCourseImageController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateImageCourse = container.resolve(UpdateCoursesImageUseCase);

        const { course_id } = request.params;

        const course = await updateImageCourse.execute({
            course_id,
            imageFileName: request.file.filename,
        });

        return response.json(classToClass(course));
    }
}
