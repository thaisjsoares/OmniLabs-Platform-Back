import {v4} from 'uuid'

import Courses from '../../infra/typeorm/entities/Courses';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import ICreateCoursesDTO from '@modules/courses/dtos/ICreateCoursesDTO'
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeCoursesRepository implements ICoursesRepository {
    private courses: Courses[] = [];

    findById(id: string): Promise<Courses | undefined> {
        throw new Error('Method not implemented.');
    }

    public async findOneByName(name: string): Promise<Courses | undefined> {
        const findCourse = this.courses.find(course => course.name === name);

        return findCourse
    }

    public async findAll(): Promise<Courses[]> {
        return this.courses
    }

    public async save(course: Courses): Promise<Courses> {
        const findIndex = this.courses.findIndex(
            findCourse => findCourse.id === course.id
        )

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
