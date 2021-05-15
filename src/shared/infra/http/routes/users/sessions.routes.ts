import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const sessionsRouter = Router();
const sessionsController = new AuthenticateUserController();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.create,
);

export default sessionsRouter;
