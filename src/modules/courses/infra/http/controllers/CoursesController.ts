import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCoursesService from '@modules/courses/services/CreateCoursesService';
import UpdateCoursesImageService from '@modules/courses/services/UpdateCoursesImageService';
import ShowCoursesService from '@modules/courses/services/ShowCoursesService';
import EditCourseService from '@modules/courses/services/UpdateCourseService';
import RemoveCoursesService from '@modules/courses/services/RemoveCoursesService';
import FindSpecificCourse from '@modules/courses/services/FindSpecificCourse';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const createCourse = container.resolve(CreateCoursesService);

        const { name, description } = request.body;

        const course = await createCourse.execute({ name, description });

        return response.json(classToClass(course));
    }

    public async updateImageCourse(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateImageCourse = container.resolve(UpdateCoursesImageService);

        const { course_id } = request.params;

        const course = await updateImageCourse.execute({
            course_id,
            imageFileName: request.file.filename,
        });

        return response.json(classToClass(course));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const showCourses = container.resolve(ShowCoursesService);

        const course = await showCourses.execute({
            page: Number(page),
            limit: Number(limit),
        });

        return response.json(classToClass(course));
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const { course_id } = request.params;

        const findCourse = container.resolve(FindSpecificCourse);

        const course = await findCourse.execute({
            course_id,
        });

        return response.json(classToClass(course));
    }

    public async edit(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const { course_id } = request.params;

        const updateCourse = container.resolve(EditCourseService);

        const course = await updateCourse.execute({
            name,
            description,
            course_id,
        });

        return response.json(classToClass(course));
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { couse_id } = request.params;

        const removeCourse = container.resolve(RemoveCoursesService);

        const course = await removeCourse.execute(couse_id);

        return response.json(classToClass(course));
    }
}
