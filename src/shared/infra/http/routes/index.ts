import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';
import lessonsRouter from '@modules/lessons/infra/http/routes/lessons.routes';
import { Router } from 'express';

import coursesRouter from './courses.routes';
import journeyRouter from './journey.routes';
import loginLogsRouter from './loginLogs.routes';
import rolesRouter from './roles.routes';
import passwordRouter from './users/password.routes';
import profileRouter from './users/profile.routes';
import sessionsRouter from './users/sessions.routes';
import usersRouter from './users/users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/groups', groupsRouter);

routes.use('/courses', coursesRouter);

routes.use('/lessons', lessonsRouter);

routes.use('/journey', journeyRouter);

routes.use('/roles', rolesRouter);

routes.use('/loginLogs', loginLogsRouter);

export default routes;
