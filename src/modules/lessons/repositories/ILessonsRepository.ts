import ICreateLessonDTO from '../dtos/ICreateLessonDTO';
import Lessons from '../infra/typeorm/entities/Lesson';

export default interface IUsersRepository {
    findById(id: string): Promise<Lessons | undefined>;
    create(data: ICreateLessonDTO): Promise<Lessons>;
    save(lesson: Lessons): Promise<Lessons>;
    findLessonCourse(course_name: string): Promise<Lessons[]>;
}
