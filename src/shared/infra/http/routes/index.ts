import coursesRouter from '@modules/courses/infra/http/routes/courses.routes';
import groupsRouter from '@modules/groups/infra/http/routes/groups.routes';
import journeyRouter from '@modules/journey/infra/http/routes/journey.routes';
import lessonsRouter from '@modules/lessons/infra/http/routes/lessons.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

import loginLogsRouter from './loginLogs.routes';
import rolesRouter from './roles.routes';

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
