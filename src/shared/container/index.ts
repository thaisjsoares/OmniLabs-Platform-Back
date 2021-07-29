import './providers';

import CoursesRepository from '@modules/courses/repositories/implementations/CoursesRepository';
import ICoursesRepository from '@modules/courses/repositories/models/ICoursesRepository';
import GroupsRepository from '@modules/groups/repositories/implementations/GroupsRepository';
import IGroupsRepository from '@modules/groups/repositories/models/IGroupsRepository';
import JourneyRepository from '@modules/journey/repositories/implementations/JourneyRepository';
import IJourneyRepository from '@modules/journey/repositories/models/IJourneyRepository';
import LessonHistoryRepository from '@modules/lessons/repositories/implementations/LessonHistoryRepository';
import LessonsRepository from '@modules/lessons/repositories/implementations/LessonsRepository';
import ILessonHistoryRepository from '@modules/lessons/repositories/models/ILessonHistoryRepository';
import ILessonsRepository from '@modules/lessons/repositories/models/ILessonsRepository';
import LoginLogRepository from '@modules/logs/repositories/implementations/LoginLogRepository';
import ILoginLogRepository from '@modules/logs/repositories/models/ILoginLogRepository';
import RolesRepository from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import IRolesRepository from '@modules/roles/repositories/models/IRolesRepository';
import UserRoleRepository from '@modules/users/infra/typeorm/repositories/UserRoleRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUserRoleRepository from '@modules/users/repositories/models/IUserRoleRepository';
import IUsersRepository from '@modules/users/repositories/models/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/models/IUserTokensRepository';
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
