import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';
import JWTMiddleware from '../../../../middleware/jwtMiddleware';

const usersController = async (req: AppReq, res: AppRes): Promise<void> => {
    res.status(201).send({ hello: 'wold' });
};

const loginController = async (_req: AppReq, res: AppRes): Promise<void> => {
    res.status(201).send({ token: JWTMiddleware.createToken() });
};

const someController = async (req: AppReq, res: AppRes): Promise<void> => {
    res.status(200).send({ test: 'hello' });
};

export default { usersController, loginController, someController };
