import ICreateCoursesDTO from '@modules/courses/dtos/ICreateCoursesDTO';
import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import { v4 } from 'uuid';

import Courses from '../../infra/typeorm/entities/Courses';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeCoursesRepository implements ICoursesRepository {
    private courses: Courses[] = [];

    public async remove(course: Courses): Promise<void> {
        const findedIndex = this.courses.findIndex(c => c.id === course.id);

        this.courses.splice(findedIndex, 1);
    }

    public async findById(id: string): Promise<Courses | undefined> {
        const findCourse = this.courses.find(course => course.id === id);

        return findCourse;
    }

    public async findOneByName(name: string): Promise<Courses | undefined> {
        const findCourse = this.courses.find(course => course.name === name);

        return findCourse;
    }

    public async findAll(): Promise<Courses[]> {
        return this.courses;
    }

    public async save(course: Courses): Promise<Courses> {
        const findIndex = this.courses.findIndex(
            findCourse => findCourse.id === course.id,
        );

        this.courses[findIndex] = course;

        return course;
    }

    public async create(courseData: ICreateCoursesDTO): Promise<Courses> {
        const course = new Courses();

        Object.assign(course, { id: v4() }, courseData);

        this.courses.push(course);

        return course;
    }
}

export default FakeCoursesRepository;
