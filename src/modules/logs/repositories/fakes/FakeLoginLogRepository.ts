import { v4 } from 'uuid'

import CreateLoginLogDTO from '@modules/logs/dtos/CreateLoginLogDTO'
import ILoginLogRepository from '../ILoginLogRepository'
import LoginLog from '@modules/logs/infra/typeorm/entities/LoginLog'
// Repository possui os metedos do typeORM de criar deletar e etc, recebendo o model como parametro

class FakeLoginLogRepository implements ILoginLogRepository {
    private loginLogs: LoginLog[] = [];

    public async create (data: CreateLoginLogDTO): Promise<LoginLog> {
      const log = new LoginLog()

      Object.assign(log, { id: v4() }, data)

      this.loginLogs.push(log)

      return log
    }
}

export default FakeLoginLogRepository
