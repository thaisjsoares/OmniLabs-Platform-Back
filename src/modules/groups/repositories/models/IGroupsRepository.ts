import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import Groups from '@modules/groups/infra/typeorm/entities/Groups';

export default interface IGroupsRepository {
    findById(id: string): Promise<Groups | undefined>;
    create(data: ICreateGroupDTO): Promise<Groups>;
    save(group: Groups): Promise<Groups>;
    findByCourse(course_id: string): Promise<Groups[]>;
    findAll(): Promise<Groups[]>;
    remove(group: Groups): Promise<void>;
}
