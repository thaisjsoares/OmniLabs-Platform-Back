import { getRepository, Repository } from 'typeorm';

import ILoginLogRepository from '@modules/logs/repositories/ILoginLogRepository';

import CreateLoginLogDTO from '@modules/logs/dtos/CreateLoginLogDTO';
import LoginLog from '../entities/LoginLog';

class LessonsRepository implements ILoginLogRepository {
    private ormRepository: Repository<LoginLog>;

    constructor() {
        this.ormRepository = getRepository(LoginLog);
    }

    public async create(data: CreateLoginLogDTO): Promise<LoginLog> {
        const loginLog = await this.ormRepository.create(data);

        await this.ormRepository.save(loginLog);

        return loginLog;
    }

    public async findAll(): Promise<LoginLog[]> {
        const logs = await this.ormRepository.find();

        return logs;
    }
}

export default LessonsRepository;
