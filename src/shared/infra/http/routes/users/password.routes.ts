import { ResetPasswordController } from '@modules/users/useCases/ResetPassword/ResetPasswordController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    resetPasswordController.handle,
);

export default passwordRouter;
