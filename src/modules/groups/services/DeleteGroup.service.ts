import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Groups from '../infra/typeorm/entities/Groups';
import IGroupsRepository from '../repositories/IGroupsRepository';

interface IRequest {
    group_id: string;
}

@injectable()
class DeleteGroupService {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,
    ) {}

    public async execute({ group_id }: IRequest): Promise<void> {
        const group = await this.groupsRepository.findById(group_id);

        if (!group) {
            throw new AppError('Not possible to find group');
        }

        await this.groupsRepository.remove(group);
    }
}

export default DeleteGroupService;
