import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import Groups from '@modules/groups/entities/Groups';

export default interface IGroupsRepository {
    findById(id: string): Promise<Groups | undefined>;
    create(data: ICreateGroupDTO): Promise<Groups>;
    save(group: Groups): Promise<Groups>;
    findByJourney(journey_id: string): Promise<Groups[]>;
    findAll(): Promise<Groups[]>;
    remove(group: Groups): Promise<void>;
}
