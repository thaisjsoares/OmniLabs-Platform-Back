import FakeJourneyRepository from '@modules/journey/repositories/fakes/FakeJourneyRepository'

import ShowAllJourneysService from './ShowAllJourneys.Service'

let fakeJourneyRepository: FakeJourneyRepository
let showAllJourneys: ShowAllJourneysService

describe('List All Journey', () => {
  beforeEach(() => {
    fakeJourneyRepository = new FakeJourneyRepository()

    showAllJourneys = new ShowAllJourneysService(
      fakeJourneyRepository
    )
  })

  it('should be able to list all Journeys', async () => {
    const journey1 = await fakeJourneyRepository.create({
      name: 'NodeJs',
      description: 'Back-end',
      course_id: '123'
    })

    const journey2 = await fakeJourneyRepository.create({
      name: 'ReactJs',
      description: 'Front-end',
      course_id: '123'
    })

    expect(
      await showAllJourneys.execute()
    ).toEqual([journey1, journey2])
  })
})
