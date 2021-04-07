import CreateLoginLogDTO from '../../dtos/CreateLoginLogDTO';
import LoginLog from '../../entities/LoginLog';

export default interface INotificationsRepository {
    create(data: CreateLoginLogDTO): Promise<LoginLog>;
    findAll(page: number, limit: number): Promise<LoginLog[]>;
}
