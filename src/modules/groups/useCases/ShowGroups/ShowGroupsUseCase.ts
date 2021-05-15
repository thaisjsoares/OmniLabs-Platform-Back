import Groups from '@modules/groups/infra/typeorm/entities/Groups';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ShowGroupsUseCase {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,
    ) {}

    public async execute(): Promise<Groups[]> {
        const groups = await this.groupsRepository.findAll();

        return groups;
    }
}

export { ShowGroupsUseCase };
