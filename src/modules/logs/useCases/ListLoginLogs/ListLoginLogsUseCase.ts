import { injectable, inject } from 'tsyringe';

import ILoginLogRepository from '../../repositories/models/ILoginLogRepository';

interface IRequest {
    page: number;
    limit: number;
}

@injectable()
class ListUsersLogs {
    constructor(
        @inject('LoginLogRepository')
        private loginLogRepository: ILoginLogRepository,
    ) {}

    public async execute({ page, limit }: IRequest) {
        const logs = await this.loginLogRepository.findAll(page, limit);

        return logs;
    }
}

export default ListUsersLogs;
