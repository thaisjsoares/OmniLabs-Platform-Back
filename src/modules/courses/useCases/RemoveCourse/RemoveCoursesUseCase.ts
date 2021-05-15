import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class RemoveCoruseUseCase {
    constructor(
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute(course_id: string): Promise<void> {
        const course = await this.coursesRepository.findById(course_id);

        if (!course) {
            throw new AppError('Not possible to find course');
        }

        await this.coursesRepository.remove(course);
    }
}

export { RemoveCoruseUseCase };
