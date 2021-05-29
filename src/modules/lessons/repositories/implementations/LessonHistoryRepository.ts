import ICreateLessonHistoryDTO from '@modules/lessons/dtos/ICreateLessonHistoryDTO';
import Lesson_History from '@modules/lessons/entities/Lesson_History';
import ILessonHistoryRepository from '@modules/lessons/repositories/models/ILessonHistoryRepository';
import { getRepository, Repository } from 'typeorm';

// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class LessonHistoryRepository implements ILessonHistoryRepository {
    private ormRepository: Repository<Lesson_History>;

    constructor() {
        this.ormRepository = getRepository(Lesson_History);
    }

    public async findById(id: string): Promise<Lesson_History | undefined> {
        const lesson = await this.ormRepository.findOne(id);

        return lesson;
    }

    public async create(
        data: ICreateLessonHistoryDTO,
    ): Promise<Lesson_History> {
        const lesson = await this.ormRepository.create(data);

        await this.ormRepository.save(lesson);

        return lesson;
    }

    public async save(lesson: Lesson_History): Promise<Lesson_History> {
        return this.ormRepository.save(lesson);
    }

    public async findByGroup(group_id: string): Promise<Lesson_History[]> {
        const lessons = await this.ormRepository.find({
            where: {
                group_id,
            },
        });

        return lessons;
    }

    public async findByTitle(
        title: string,
    ): Promise<Lesson_History | undefined> {
        const lessonHistory = await this.ormRepository.findOne({
            where: {
                title,
            },
        });

        return lessonHistory;
    }

    public async findByName(name: string): Promise<Lesson_History | undefined> {
        const lessonHistory = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return lessonHistory;
    }
}

export default LessonHistoryRepository;
