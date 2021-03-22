import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICoursesRepository from '../repositories/ICoursesRepository'

import Courses from '../infra/typeorm/entities/Courses'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

@injectable()
class ShowCoursesService {
  constructor (
        @inject('CoursesRepository')
        private coursesRepository: ICoursesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
  ) {}

  public async execute (): Promise<Courses[]> {
    const course = await this.coursesRepository.findAll()

    return course
  }
}

export default ShowCoursesService
