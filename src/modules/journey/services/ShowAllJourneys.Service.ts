import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IJourneyRepository from '../repositories/IJourneyRepository'

import Journey from '../infra/typeorm/entities/Journey'

@injectable()
class ShowAllJourneys {
  constructor (
        @inject('JourneyRepository')
        private journeyRepository: IJourneyRepository
  ) {}

  public async execute (): Promise<Journey[]> {
    const journeys = await this.journeyRepository.find()

    return journeys
  }
}

export default ShowAllJourneys
