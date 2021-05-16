import ICreateLessonDTO from '../dtos/ICreateLessonDTO';
import Lessons from '../infra/typeorm/entities/Lessons';

export default interface ILessonsRepository {
    findById(id: string): Promise<Lessons | undefined>;
    create(data: ICreateLessonDTO): Promise<Lessons>;
    save(lesson: Lessons): Promise<Lessons>;
    remove(lesson: Lessons): Promise<void>;
}
