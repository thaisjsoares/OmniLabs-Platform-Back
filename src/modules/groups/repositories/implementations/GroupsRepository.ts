import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import Groups from '@modules/groups/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import { getRepository, Repository } from 'typeorm';

class GroupsRepository implements IGroupsRepository {
    private ormRepository: Repository<Groups>;

    constructor() {
        this.ormRepository = getRepository(Groups);
    }

    public async findById(id: string): Promise<Groups | undefined> {
        const group = await this.ormRepository.findOne(id);

        return group;
    }

    public async create(data: ICreateGroupDTO): Promise<Groups> {
        const group = await this.ormRepository.create(data);

        await this.ormRepository.save(group);

        return group;
    }

    public async save(groups: Groups): Promise<Groups> {
        return this.ormRepository.save(groups);
    }

    public async findByJourney(journey_id: string): Promise<Groups[]> {
        const groups = await this.ormRepository.find({
            where: {
                journey_id,
            },
        });

        return groups;
    }

    public async findAll(): Promise<Groups[]> {
        const groups = await this.ormRepository.find();

        return groups;
    }

    public async remove(group: Groups): Promise<void> {
        await this.ormRepository.remove(group);
    }
}

export default GroupsRepository;
