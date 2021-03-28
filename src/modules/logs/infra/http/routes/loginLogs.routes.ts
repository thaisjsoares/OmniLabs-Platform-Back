import { Router } from 'express';

import LoginLogController from '@modules/logs/infra/http/controllers/LoginLogController';

const loginLogsRouter = Router();

const loginLogsController = new LoginLogController();

loginLogsRouter.get('/', loginLogsController.show);

export default loginLogsRouter;
