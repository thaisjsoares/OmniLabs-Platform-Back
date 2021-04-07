import CreateLoginLogDTO from '@modules/logs/dtos/CreateLoginLogDTO';
import LoginLog from '@modules/logs/entities/LoginLog';
import { v4 } from 'uuid';

import ILoginLogRepository from '../models/ILoginLogRepository';
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeLoginLogRepository implements ILoginLogRepository {
    private loginLogs: LoginLog[] = [];

    public async create(data: CreateLoginLogDTO): Promise<LoginLog> {
        const log = new LoginLog();

        Object.assign(log, { id: v4() }, data);

        this.loginLogs.push(log);

        return log;
    }

    public async findAll(page: number, limit: number): Promise<LoginLog[]> {
        return this.loginLogs;
    }
}

export default FakeLoginLogRepository;
