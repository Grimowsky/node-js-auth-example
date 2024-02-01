import * as express from 'express';
import * as RegistrationController from '../Controllers/Registration.controller';
const createRouter = (): express.Router => {
    const router = express.Router();
    router.post('/register', RegistrationController.register);

    return router;
};

export default createRouter;
