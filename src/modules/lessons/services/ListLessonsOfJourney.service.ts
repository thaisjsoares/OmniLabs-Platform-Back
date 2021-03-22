import { injectable, inject } from 'tsyringe'
import { format } from 'date-fns'
import ILessonsRepository from '../repositories/ILessonsRepository'

import AppError from '@shared/errors/AppError'
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository'
import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository'
import Groups from '@modules/groups/infra/typeorm/entities/Groups'

interface IRequest {
    journey_name: string;
}

interface IResponse {
    group: {
        id: string;
        name: string;
        description: string;
        journey_id: string
    },
    lessons: {
        duration: string;
        id: string;
        name: string;
        description: string;
        video_id: string;
        group: Groups;
        group_id: string;
    }[]
}

@injectable()
class ListLessonOfCourse {
  constructor (
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,

        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository
  ) {}

  public async execute ({ journey_name }: IRequest): Promise<IResponse[]> {
    const journey = await this.journeyRepository.findByName(journey_name)

    if (!journey) {
      throw new AppError('Not possible to find Journey')
    }

    const groups = await this.groupsRepository.findByJourney(journey.id)

    const groupsLessons = await Promise.all(
      groups.map(async (group) => {
        const lessons = await this.lessonsRepository.findByModule(group.id)

        const formatedLessons = lessons.map((lesson) => {
          const minutes = Math.floor(lesson.duration / 60)
          const seconds = lesson.duration - minutes * 60

          return { ...lesson, duration: format(new Date(0, 0, 0, 0, minutes, seconds), 'mm \'min\', ss \'s\'') }
        })

        return {
          group: group,
          lessons: formatedLessons
        }
      })
    )

    return groupsLessons
  }
}

export default ListLessonOfCourse
