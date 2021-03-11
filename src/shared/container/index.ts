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

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ModulesRepository from '@modules/modules/infra/typeorm/repositories/ModulesRepository';

import IJourneyRepository from '@modules/journey/repositories/IJourneyRepository';
import JourneyRepository from '@modules/journey/infra/typeorm/repositories/JourneyRepository';

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
    LessonsRepository
);

container.registerSingleton<IModulesRepository>(
    'ModulesRepository',
    ModulesRepository
)

container.registerSingleton<IJourneyRepository>(
    'JourneyRepository',
    JourneyRepository
)
