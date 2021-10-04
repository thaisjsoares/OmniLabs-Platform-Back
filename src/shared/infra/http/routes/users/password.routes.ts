import { ResetPasswordUserController } from '@modules/users/useCases/ResetPasswordUser/ResetPasswordUserController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordUserController();

passwordRouter.post('/reset', resetPasswordController.handle);

export default passwordRouter;
