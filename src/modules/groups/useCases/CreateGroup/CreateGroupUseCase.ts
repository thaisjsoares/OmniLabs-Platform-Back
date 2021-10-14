import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import Groups from '@modules/groups/infra/typeorm/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
    course_id: string;
}

@injectable()
class CreateGroupUseCase {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,
    ) {}

    public async execute({
        name,
        description,
        course_id,
    }: IRequest): Promise<Groups> {
        const course = await this.coursesRepository.findById(course_id);

        if (!course) {
            throw new AppError('Not possible to find course');
        }

        const group = await this.groupsRepository.create({
            name,
            description,
            course_id: course.id,
        });

        return group;
    }
}

export { CreateGroupUseCase };
