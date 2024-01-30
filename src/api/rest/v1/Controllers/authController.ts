import { Router } from 'express';
import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';
import JWTMiddleware from '../../../../middleware/jwtMiddleware';

const router = Router();

router.use('/users', async (req: AppReq, res: AppRes) => {
    res.status(201).send({ hello: 'world' });
});

router.post('/login', async (req: AppReq, res: AppRes) => {
    res.status(201).send({ token: JWTMiddleware.createToken() });
});

router.post(
    '/some',
    JWTMiddleware.verifyToken,
    async (req: AppReq, res: AppRes) => {
        res.status(201).send({ ok: 'true' });
    }
);

export default router;
