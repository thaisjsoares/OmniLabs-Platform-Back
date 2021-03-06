import Groups from '@modules/groups/infra/typeorm/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
    journey_id: string;
    group_id: string;
}

@injectable()
class UpdateGroupUseCase {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,
    ) {}

    public async execute({
        group_id,
        description,
        journey_id,
        name,
    }: IRequest): Promise<Groups> {
        const group = await this.groupsRepository.findById(group_id);

        if (!group) {
            throw new AppError('Not possible to find group');
        }

        group.name = name;
        group.description = description;
        group.journey_id = journey_id;

        await this.groupsRepository.save(group);

        return group;
    }
}

export { UpdateGroupUseCase };
