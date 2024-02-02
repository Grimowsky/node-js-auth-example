import * as express from 'express';
import RegistrationController from '@controllers/RegistrationController';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import validateRequestMiddleware from '../../../../middleware/validateRequest';
import { UserRegisterSchema } from '../../../../validators/Register.validators';

const createRouter = (): express.Router => {
    const router = express.Router();
    router.post(
        '/register',
        asyncWrapper(validateRequestMiddleware(UserRegisterSchema)),
        asyncWrapper(RegistrationController.register)
    );

    return router;
};

export default createRouter;
