/* eslint-disable no-shadow */
import ICreateJourneyDTO from '@modules/journey/dtos/ICreateJourneyDTO';
import Journey from '@modules/journey/entities/Journey';
import { v4 } from 'uuid';

import IJourneyRepository from '../models/IJourneyRepository';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeJourneyRepository implements IJourneyRepository {
    private journeys: Journey[] = [];

    public async findById(id: string): Promise<Journey | undefined> {
        const journey = this.journeys.find(journey => journey.id === id);

        return journey;
    }

    public async save(journey: Journey): Promise<Journey> {
        const findIndex = this.journeys.findIndex(
            findJourney => findJourney.id === journey.id,
        );

        this.journeys[findIndex] = journey;

        return journey;
    }

    public async findByName(journeyName: string): Promise<Journey | undefined> {
        const journey = this.journeys.find(
            journey => journey.name === journeyName,
        );

        return journey;
    }

    public async findByCourseId(course_id: string): Promise<Journey[]> {
        const journey = this.journeys.filter(
            journey => journey.course_id === course_id,
        );

        return [...journey];
    }

    public async find(): Promise<Journey[]> {
        return this.journeys;
    }

    public async remove(journey: Journey): Promise<void> {
        const findedIndex = this.journeys.findIndex(
            journeys => journeys.id === journey.id,
        );
        this.journeys.splice(findedIndex, 1);
    }

    public async create(journeyData: ICreateJourneyDTO): Promise<Journey> {
        const journey = new Journey();

        Object.assign(journey, { id: v4() }, journeyData);

        this.journeys.push(journey);

        return journey;
    }
}

export default FakeJourneyRepository;
