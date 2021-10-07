import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
    group_id: string;
}

@injectable()
class DeleteGroupUseCase {
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

export { DeleteGroupUseCase };
