import { ResetPasswordUserController } from '@modules/users/useCases/ResetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/users/useCases/SendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordUserController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouter.post('/reset', resetPasswordController.handle);
passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);

export default passwordRouter;
