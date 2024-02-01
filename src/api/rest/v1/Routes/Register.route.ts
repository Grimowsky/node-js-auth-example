import * as express from 'express';
import RegistrationController from '@controllers/RegistrationController';
const createRouter = (): express.Router => {
    const router = express.Router();
    router.post('/register', RegistrationController.register);

    return router;
};

export default createRouter;
