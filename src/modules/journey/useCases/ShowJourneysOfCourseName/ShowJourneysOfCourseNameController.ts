import ShowJourneysOfCourseNameUseCase from '@modules/journey/useCases/ShowJourneysOfCourseName/ShowJourneysOfCourseNameUseCase';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShowJourneysOfCourseNameController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { course_name } = request.params;

        const findJourneysByCourseId = container.resolve(
            ShowJourneysOfCourseNameUseCase,
        );

        const journeys = await findJourneysByCourseId.execute(course_name);

        return response.json(classToClass(journeys));
    }
}

export default ShowJourneysOfCourseNameController;
