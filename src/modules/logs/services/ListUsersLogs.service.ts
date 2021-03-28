import { injectable, inject } from 'tsyringe';
import ILoginLogRepository from '../repositories/ILoginLogRepository';

@injectable()
class ListUsersLogs {
    constructor(
        @inject('LoginLogRepository')
        private loginLogRepository: ILoginLogRepository,
    ) {}

    public async execute() {
        const logs = await this.loginLogRepository.findAll();

        return logs;
    }
}

export default ListUsersLogs;
