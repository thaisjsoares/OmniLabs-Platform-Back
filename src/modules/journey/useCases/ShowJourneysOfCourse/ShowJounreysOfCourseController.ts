import ShowJourneysOfCourse from '@modules/journey/useCases/ShowJourneysOfCourse/ShowJourneysOfCourseUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowJounreysOfCourseController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { course_id } = request.params;

        const findJourneysByCourseId = container.resolve(ShowJourneysOfCourse);

        const journeys = await findJourneysByCourseId.execute(course_id);

        return response.json(classToClass(journeys));
    }
}

export default ShowJounreysOfCourseController;
