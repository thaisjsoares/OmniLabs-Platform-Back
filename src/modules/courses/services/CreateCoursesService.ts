import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICoursesRepository from '../repositories/ICoursesRepository'

import Courses from '../infra/typeorm/entities/Courses'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCoursesService {
  constructor (
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
  ) {}

  public async execute ({ name, description }: IRequest): Promise<Courses> {
    const courseExists = await this.coursesRepository.findOneByName(name)

    if (courseExists) {
      throw new AppError('this course already exists')
    }

    const course = await this.coursesRepository.create({
      name,
      description
    })

    await this.cacheProvider.invalidate('courses-list')

    return course
  }
}

export default CreateCoursesService
