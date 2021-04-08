import ICreateJourneyDTO from '../../dtos/ICreateJourneyDTO';
import Journey from '../../entities/Journey';

export default interface IJourneyRepository {
    findById(id: string): Promise<Journey | undefined>;
    create(data: ICreateJourneyDTO): Promise<Journey>;
    save(journey: Journey): Promise<Journey>;
    findByName(journeyName: string): Promise<Journey | undefined>;
    findByCourseId(course_id: string): Promise<Journey[]>;
    find(): Promise<Journey[]>;
    remove(journey: Journey): Promise<void>;
}
