import CreateLoginLogDTO from '../dtos/CreateLoginLogDTO'
import LoginLog from '../infra/typeorm/entities/LoginLog'

export default interface INotificationsRepository {
    create(data: CreateLoginLogDTO): Promise<LoginLog>;
}
