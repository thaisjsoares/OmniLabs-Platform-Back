/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import auth from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export default async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Token not present.',
        });
    }

    const [, token] = authorization.split(' ');

    if (!token) {
        return response.status(401).json({
            error: true,
            code: 'token.invalid',
            message: 'Token not present.',
        });
    }

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        request.user = {
            id: user_id,
        };

        next();
    } catch (err) {
        return response.status(401).json({
            error: true,
            code: 'token.expired',
            message: 'Token invalid.',
        });
    }
}
