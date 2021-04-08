import '@modules/users/providers';
import './providers';

import CoursesRepository from '@modules/courses/infra/typeorm/repositories/CoursesRepository';
import ICoursesRepository from '@modules/courses/repositories/ICoursesRepository';
import GroupsRepository from '@modules/groups/infra/typeorm/repositories/GroupsRepository';
import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository';
import JourneyRepository from '@modules/journey/repositories/implementations/JourneyRepository';
import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import LessonHistoryRepository from '@modules/lessons/infra/typeorm/repositories/LessonHistoryRepository';
import LessonsRepository from '@modules/lessons/infra/typeorm/repositories/LessonsRepository';
import ILessonHistoryRepository from '@modules/lessons/repositories/ILessonHistoryRepository';
import ILessonsRepository from '@modules/lessons/repositories/ILessonsRepository';
import LoginLogRepository from '@modules/logs/repositories/implementations/LoginLogRepository';
import ILoginLogRepository from '@modules/logs/repositories/models/ILoginLogRepository';
import RolesRepository from '@modules/roles/repositories/implementations/RolesRepository';
import IRolesRepository from '@modules/roles/repositories/models/IRolesRepository';
import UserRoleRepository from '@modules/users/infra/typeorm/repositories/UserRoleRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserRoleRepository from '@modules/users/repositories/IUserRoleRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';

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
