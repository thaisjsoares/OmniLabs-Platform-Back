/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

import 'dotenv/config';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { json, Request, Response, NextFunction } from 'express';

// import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '@shared/container';
import getConnection from '@shared/infra/typeorm/';

getConnection();

const app = express();

app.use(cors());
// app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());
app.use(
    (
        err: Error,
        _request: Request,
        response: Response,
        _next: NextFunction,
    ) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${err.message}`,
        });
    },
);

export { app };
