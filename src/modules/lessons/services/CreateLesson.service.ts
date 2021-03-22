import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ILessonsRepository from '../repositories/ILessonsRepository'

import Lesson from '../infra/typeorm/entities/Lesson'
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository'

interface IRequest {
    name: string
    description: string
    duration: number
    video_id: string
    group_id: string
}
@injectable()
class CreateLessonService {
  constructor (
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository
  ) {}

  public async execute ({
    name,
    description,
    duration,
    video_id,
    group_id
  }: IRequest): Promise<Lesson> {
    const module = await this.groupsRepository.findById(group_id)

    if (!module) {
      throw new AppError('Not possible to find a Module')
    }

    const lesson = await this.lessonsRepository.create({
      name,
      description,
      duration,
      video_id,
      group_id
    })

    return lesson
  }
}

export default CreateLessonService
