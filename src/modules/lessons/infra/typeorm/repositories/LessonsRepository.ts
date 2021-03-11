import { getRepository, Repository, Not } from 'typeorm';

import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';

import Lesson from '../entities/Lesson';
import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class LessonsRepository implements ILessonsRepository {
    private ormRepository: Repository<Lesson>;

    constructor() {
        this.ormRepository = getRepository(Lesson);
    }

    public async findById(id: string): Promise<Lesson | undefined> {
        const lesson = await this.ormRepository.findOne(id);

        return lesson;
    }

    public async create(data: ICreateLessonDTO): Promise<Lesson> {
        const lesson = await this.ormRepository.create(data);

        await this.ormRepository.save(lesson);

        return lesson;
    }

    public async save(lesson: Lesson): Promise<Lesson> {
        return this.ormRepository.save(lesson);
    }

    public async findLessonJourney(journey_id: string): Promise<Lesson[]> {
        const lesson = await this.ormRepository.find({
            where: {
                journey_id: journey_id
            }
        })
        

        return lesson;
    }
}

export default LessonsRepository;
