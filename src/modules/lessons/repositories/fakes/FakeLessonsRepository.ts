import {v4} from 'uuid'

import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO'
import ILessonsRepository from '../ILessonsRepository';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lesson';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeLessonsRepository implements ILessonsRepository {
    private lessons: Lesson[] = [];

    public async findById(id: string): Promise<Lesson | undefined> {
        const lesson = this.lessons.find(lesson => lesson.id == id);

        return lesson;
    }

    public async create(data: ICreateLessonDTO): Promise<Lesson> {
        const lesson = new Lesson();

        Object.assign(lesson, { id: v4() }, data);

        this.lessons.push(lesson);

        return lesson;
    }

    public async save(lesson: Lesson): Promise<Lesson> {
        const findIndex = this.lessons.findIndex(
            findJourney => findJourney.id === lesson.id,
        );

        this.lessons[findIndex] = lesson;

        return lesson;
    }

    public async findByModule(module_id: string): Promise<Lesson[]> {
        const lessons = this.lessons.filter(lesson => lesson.module_id === module_id);

        return lessons;
    }

}

export default FakeLessonsRepository;
