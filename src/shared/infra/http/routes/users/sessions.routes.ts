import AuthenticateUserController from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/users/useCases/RefreshToken/RefreshTokenController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const sessionsRouter = Router();
const sessionsController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.handle,
);
sessionsRouter.post('/refresh-token', refreshTokenController.handle);

export default sessionsRouter;
