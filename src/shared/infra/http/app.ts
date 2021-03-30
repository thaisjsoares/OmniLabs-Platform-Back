/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import errorsHandler from '@shared/errors/Handler';
import routes from '@shared/infra/http/routes';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import '@shared/container';
import getConnection from '@shared/infra/typeorm/';

getConnection();

const app = express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());
app.use(errorsHandler);

export { app };
