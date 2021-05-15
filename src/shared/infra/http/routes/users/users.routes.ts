import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/users/useCases/CreateUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/users/useCases/UpdateUserAvatar/UpdateUserAvatarController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new CreateUserController();
const userAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.handle,
);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.handle,
);

export default usersRouter;
