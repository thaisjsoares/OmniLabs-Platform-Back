import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import Groups from '@modules/groups/infra/typeorm/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import { v4 } from 'uuid';

class FakeModulesRepository implements IGroupsRepository {
    private groups: Groups[] = [];

    public async findAll(): Promise<Groups[]> {
        return this.groups;
    }

    public async remove(group: Groups): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async findById(id: string): Promise<Groups | undefined> {
        const group = this.groups.find(module => module.id === id);

        return group;
    }

    public async create(data: ICreateGroupDTO): Promise<Groups> {
        const group = new Groups();

        Object.assign(group, { id: v4() }, data);

        this.groups.push(group);

        return group;
    }

    public async save(module: Groups): Promise<Groups> {
        const findIndex = this.groups.findIndex(
            findJourney => findJourney.id === module.id,
        );

        this.groups[findIndex] = module;

        return module;
    }

    public async findByJourney(journey_id: string): Promise<Groups[]> {
        const groups = this.groups.filter(
            group => group.journey_id === journey_id,
        );

        return groups;
    }
}

export default FakeModulesRepository;
