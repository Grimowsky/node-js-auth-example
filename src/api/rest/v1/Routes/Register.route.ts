import * as express from 'express';
import RegistrationController from '@controllers/RegistrationController';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
const createRouter = (): express.Router => {
    const router = express.Router();
    router.post('/register', asyncWrapper(RegistrationController.register));

    return router;
};

export default createRouter;
