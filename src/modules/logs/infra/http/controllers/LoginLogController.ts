import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersLogs from '@modules/logs/services/ListUsersLogs.service';

class LoginLogController {
    public async show(request: Request, response: Response): Promise<Response> {
        const listLoginLog = container.resolve(ListUsersLogs);

        const logs = await listLoginLog.execute();

        return response.json(logs);
    }
}

export default LoginLogController;
