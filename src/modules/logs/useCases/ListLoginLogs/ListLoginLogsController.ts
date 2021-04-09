import ListUsersLogs from '@modules/logs/useCases/ListLoginLogs/ListLoginLogsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListLoginLogsController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { page, limit } = request.query;

            const listLoginLog = container.resolve(ListUsersLogs);

            const logs = await listLoginLog.execute({
                page: Number(page),
                limit: Number(limit),
            });

            return response.status(200).json(logs);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { ListLoginLogsController };
