import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersLogs from '@modules/logs/services/ListUsersLogs.service';

class LoginLogController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { page, limit } = request.query;

        const listLoginLog = container.resolve(ListUsersLogs);

        const logs = await listLoginLog.execute({
            page: Number(page),
            limit: Number(limit),
        });

        return response.json(logs);
    }
}

export default LoginLogController;
