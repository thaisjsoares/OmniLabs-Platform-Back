import {v4} from 'uuid'

import ICreateJourneyDTO from '@modules/journey/dtos/ICreateJourneyDTO'
import IJourneyRepository from '../IJourneyRepository';
import Journey from '@modules/journey/infra/typeorm/entities/Journey';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeJourneyRepository implements IJourneyRepository {
    private journeys: Journey[] = [];

    public async findById(id: string): Promise<Journey | undefined> {
        const journey = this.journeys.find(journey => journey.id === id);

        return journey;
    }

    save(user: Journey): Promise<Journey> {
        throw new Error('Method not implemented.');
    }

    public async findByName(journeyName: string): Promise<Journey | undefined> {
        const journey = this.journeys.find(journey => journey.name === journeyName);

        return journey
    }

    findByCourseId(course_id: string): Promise<Journey[]> {
        throw new Error('Method not implemented.');
    }

    find(): Promise<Journey[]> {
        throw new Error('Method not implemented.');
    }

    public async remove(journey: Journey): Promise<void> {
        const findedIndex = this.journeys.findIndex(journey => journey.id)
        this.journeys.splice(findedIndex, 1)
    }

    public async create(journeyData: ICreateJourneyDTO): Promise<Journey> {
      const journey = new Journey();

      Object.assign(journey, { id: v4() }, journeyData);

      this.journeys.push(journey);

      return journey;
  }

}

export default FakeJourneyRepository;