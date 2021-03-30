/* eslint-disable no-shadow */
import { v4 } from 'uuid';

import ICreateLessonDTO from '@modules/lessons/dtos/ICreateLessonDTO';
import Lesson from '@modules/lessons/infra/typeorm/entities/Lessons';
import ILessonsRepository from '../ILessonsRepository';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeLessonsRepository implements ILessonsRepository {
    private lessons: Lesson[] = [];

    public async findById(id: string): Promise<Lesson | undefined> {
        const lesson = this.lessons.find(lesson => lesson.id === id);

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

    public async remove(lesson: Lesson): Promise<void> {
        const findedIndex = this.lessons.findIndex(
            lessons => lessons.id === lesson.id,
        );
        this.lessons.splice(findedIndex, 1);
    }
}

export default FakeLessonsRepository;
