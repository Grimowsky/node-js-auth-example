import * as express from 'express';
import { asyncWrapper } from '../../../../middleware/asyncWrapper';
import AuthController from '../Controllers/Auth.controller';
import JWTMiddleware from '../../../../middleware/jwtMiddleware';

const createRouter = (): express.Router => {
    const router = express.Router();

    router.use('/login', asyncWrapper(AuthController.loginController));
    router.use(
        '/token/verify',
        JWTMiddleware.authenticateToken,
        asyncWrapper(AuthController.someController)
    );

    return router;
};

export default createRouter;
