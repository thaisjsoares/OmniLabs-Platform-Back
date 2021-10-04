import ICreateCoursesDTO from '@modules/courses/dtos/ICreateCoursesDTO';
import Courses from '@modules/courses/infra/typeorm/entities/Courses';

export default interface IUsersRepository {
    findById(id: string): Promise<Courses | undefined>;
    findOneByName(name: string): Promise<Courses | undefined>;
    findAll(page: number, limit: number): Promise<Courses[]>;
    create(courseData: ICreateCoursesDTO): Promise<Courses>;
    save(user: Courses): Promise<Courses>;
    remove(course: Courses): Promise<void>;
}
