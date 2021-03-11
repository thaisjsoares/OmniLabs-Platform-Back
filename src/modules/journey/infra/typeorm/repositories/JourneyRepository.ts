import { getRepository, Repository, Not } from 'typeorm';

import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';
import ICreateJourneyDTO from '@modules/journey/dtos/ICreateJourneyDTO';

import Journey from '../entities/Journey';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class JourneyRepository implements IJourneyRepository {
    private ormRepository: Repository<Journey>;

    constructor() {
        this.ormRepository = getRepository(Journey);
    }

    public async findById(id: string): Promise<Journey | undefined> {
        const journey = await this.ormRepository.findOne(id);

        return journey;
    }

    public async create(JourneyData: ICreateJourneyDTO): Promise<Journey> {
        const journey = this.ormRepository.create(JourneyData);

        await this.ormRepository.save(journey);

        return journey;
    }

    public async save(Journey: Journey): Promise<Journey> {
        return this.ormRepository.save(Journey);
    }

    public async findByName(journeyName: string): Promise<Journey | undefined> {
        const journey = await this.ormRepository.findOne({
            where: {
                name: journeyName
            }
        })

        return journey;
    }
}

export default JourneyRepository;
