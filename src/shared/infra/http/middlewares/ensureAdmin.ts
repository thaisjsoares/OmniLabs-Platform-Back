/* eslint-disable import/prefer-default-export */
import UserRoleRepository from '@modules/users/infra/typeorm/repositories/UserRoleRepository';
import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { id } = request.user;

    const userRoleRepository = new UserRoleRepository();
    const userRole = await userRoleRepository.findByUserId(id);

    if (!userRole) {
        throw new AppError("User isn't admin");
    }

    return next();
}
