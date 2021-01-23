import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCoursesService from '@modules/courses/services/CreateCoursesService';
import UpdateCoursesImageService from '@modules/courses/services/UpdateCoursesImageService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createCourse = container.resolve(CreateCoursesService);

        const name = request.body;

        const course = await createCourse.execute(name);

        return response.json(classToClass(course));
    }

    public async updateImageCourse(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateImageCourse = container.resolve(UpdateCoursesImageService);

        const imageFileName = request.file.filename;
        const {course_id} = request.params;

        console.log(course_id);

        const course = await updateImageCourse.execute({course_id,imageFileName});

        return response.json(classToClass(course));
    }
}
