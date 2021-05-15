import { ShowProfileController } from '@modules/users/useCases/ShowProfile/ShowProfileController';
import { UpdateProfileController } from '@modules/users/useCases/UpdateProfile/UpdateProfileController';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', showProfileController.handle);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    updateProfileController.handle,
);

export default profileRouter;
