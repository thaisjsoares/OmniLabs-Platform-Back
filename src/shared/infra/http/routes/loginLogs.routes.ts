import { ListLoginLogsController } from '@modules/logs/useCases/ListLoginLogs/ListLoginLogsController';
import { Router } from 'express';

const loginLogsRouter = Router();

const listLoginLogsController = new ListLoginLogsController();

loginLogsRouter.get('/', listLoginLogsController.handle);

export default loginLogsRouter;
