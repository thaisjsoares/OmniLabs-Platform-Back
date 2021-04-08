import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Groups from '../infra/typeorm/entities/Groups';
import IGroupsRepository from '../repositories/IGroupsRepository';

@injectable()
class ShowGroupsService {
    constructor(
        @inject('GroupsRepository')
        private groupsRepository: IGroupsRepository,
    ) {}

    public async execute(): Promise<Groups[]> {
        const groups = await this.groupsRepository.findAll();

        return groups;
    }
}

export default ShowGroupsService;
