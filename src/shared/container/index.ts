import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';

import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import LessonsRepository from '@modules/lessons/infra/typeorm/repositories/LessonsRepository';

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import GroupsRepository from '@modules/groups/infra/typeorm/repositories/GroupsRepository';

import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';
import JourneyRepository from '@modules/journey/infra/typeorm/repositories/JourneyRepository';

import IRolesRepository from '@modules/roles/repositories/models/IRolesRepository';
import RolesRepository from '@modules/roles/repositories/implementations/RolesRepository';

import ILoginLogRepository from '@modules/logs/repositories/ILoginLogRepository';
import LoginLogRepository from '@modules/logs/infra/typeorm/repositories/LoginLogRepository';

import ILessonHistoryRepository from '@modules/lessons/repositories/ILessonHistoryRepository';
import LessonHistoryRepository from '@modules/lessons/infra/typeorm/repositories/LessonHistoryRepository';

import UserRoleRepository from '@modules/users/infra/typeorm/repositories/UserRoleRepository';
import IUserRoleRepository from '@modules/users/repositories/IUserRoleRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<ICoursesRepository>(
    'CoursesRepository',
    CoursesRepository,
);

container.registerSingleton<ILessonsRepository>(
    'LessonsRepository',
    LessonsRepository,
);

container.registerSingleton<ILessonHistoryRepository>(
    'LessonHistoryRepository',
    LessonHistoryRepository,
);

container.registerSingleton<IGroupsRepository>(
    'GroupsRepository',
    GroupsRepository,
);

container.registerSingleton<IJourneyRepository>(
    'JourneyRepository',
    JourneyRepository,
);

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
);

container.registerSingleton<ILoginLogRepository>(
    'LoginLogRepository',
    LoginLogRepository,
);

container.registerSingleton<IUserRoleRepository>(
    'UserRoleRepository',
    UserRoleRepository,
);
