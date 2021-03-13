import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ILessonsRepository from '../repositories/ILessonsRepository';

import Lesson from '../infra/typeorm/entities/Lesson';
import IModulesRepository from '@modules/modules/repositories/IModulesRepository';

interface IRequest {
    name: string;
    description: string;
    duration: number;
    video_id: string;
    module_id: string;
}
@injectable()
class CreateLessonService {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository
    ) {}

    public async execute({ name, description, duration, video_id, module_id }: IRequest): Promise<Lesson> {
        const module = await this.modulesRepository.findById(module_id);

        if(!module) {
            throw new AppError('Not possible to find a Module')
        }

        const lesson = await this.lessonsRepository.create({
            name, 
            description, 
            duration, 
            video_id,
            module_id
        });

        return lesson;
    }
}

export default CreateLessonService;
