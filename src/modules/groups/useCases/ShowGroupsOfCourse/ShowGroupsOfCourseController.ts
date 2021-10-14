import { ShowGroupsOfCourseUseCase } from '@modules/groups/useCases/ShowGroupsOfCourse/ShowGroupsOfCourseUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowGroupsOfCourseController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { course_id } = request.params;

        const showGroupsOfCourse = container.resolve(ShowGroupsOfCourseUseCase);

        const groups = await showGroupsOfCourse.execute({ course_id });

        return response.json(groups);
    }
}

export { ShowGroupsOfCourseController };
