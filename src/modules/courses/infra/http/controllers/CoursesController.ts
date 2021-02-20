import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCoursesService from '@modules/courses/services/CreateCoursesService';
import UpdateCoursesImageService from '@modules/courses/services/UpdateCoursesImageService';
import ShowCoursesService from '@modules/courses/services/ShowCoursesService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createCourse = container.resolve(CreateCoursesService);

        const {name, description} = request.body;

        const course = await createCourse.execute({name, description});

        return response.json(classToClass(course));
    }

    public async updateImageCourse(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateImageCourse = container.resolve(UpdateCoursesImageService);

        const {course_id} = request.params;

        const course = await updateImageCourse.execute({
            course_id,
            imageFileName: request.file.filename
        })

        return response.json(classToClass(course));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const showCourses = container.resolve(ShowCoursesService)

        const course = await showCourses.execute();

        return response.json(course)
    }
}
