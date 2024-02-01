import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';
import JwtMiddleware from '../../../../middleware/jwtMiddleware';

const login = async (req: AppReq, res: AppRes): Promise<void> => {
    res.status(200).send({ token: JwtMiddleware.createToken() });
};

const logout = async (req: AppReq, res: AppRes): Promise<void> => {
    res.status(200).send({ message: 'logged out' });
};

export { login, logout };
