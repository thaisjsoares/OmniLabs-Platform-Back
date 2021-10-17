import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import Lessons from '@modules/lessons/infra/typeorm/entities/Lessons';
import ILessonsRepository from '@modules/lessons/repositories/models/ILessonsRepository';
import { getRepository, Repository } from 'typeorm';

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class LessonsRepository implements ILessonsRepository {
    private ormRepository: Repository<Lessons>;

    constructor() {
        this.ormRepository = getRepository(Lessons);
    }

    public async findByTitle(title: string): Promise<Lessons | undefined> {
        const lesson = await this.ormRepository.findOne({
            where: {
                title,
            },
        });

        return lesson;
    }

    public async findByGroup(group_id: string): Promise<Lessons[]> {
        throw new Error('Method not implemented.');
    }

    public async findByName(name: string): Promise<Lessons | undefined> {
        const lesson = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return lesson;
    }

    public async findById(id: string): Promise<Lessons | undefined> {
        const lesson = await this.ormRepository.findOne(id);

        return lesson;
    }

    public async create(data: ICreateLessonDTO): Promise<Lessons> {
        const lesson = this.ormRepository.create(data);

        await this.ormRepository.save(lesson);

        return lesson;
    }

    public async save(lesson: Lessons): Promise<Lessons> {
        return this.ormRepository.save(lesson);
    }

    public async remove(lesson: Lessons): Promise<void> {
        await this.ormRepository.remove(lesson);
    }
}

export default LessonsRepository;
