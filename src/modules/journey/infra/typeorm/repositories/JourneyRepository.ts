import ICreateJourneyDTO from '@modules/journey/dtos/ICreateJourneyDTO';
import Journey from '@modules/journey/infra/typeorm/entities/Journey';
import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import { getRepository, Repository, Not } from 'typeorm';

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

    public async save(journey: Journey): Promise<Journey> {
        return this.ormRepository.save(journey);
    }

    public async findByName(journeyName: string): Promise<Journey | undefined> {
        const journey = await this.ormRepository.findOne({
            where: {
                name: journeyName,
            },
        });

        return journey;
    }

    public async findByCourseId(course_id: string): Promise<Journey[]> {
        const journey = await this.ormRepository.find({
            where: {
                course_id,
            },
        });

        return journey;
    }

    public async find(): Promise<Journey[]> {
        const journeys = await this.ormRepository.find();

        return journeys;
    }

    public async remove(journey: Journey): Promise<void> {
        await this.ormRepository.remove(journey);
    }
}

export default JourneyRepository;
