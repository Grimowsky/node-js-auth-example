import {
    type AppReq,
    type AppRes,
} from '../../../../common/types/Request.type';
import { type LoginReq } from '@services/Auth/Auth.type';
import AuthService from '@services/Auth/Auth.service';

const login = async (loginData: AppReq, res: AppRes): Promise<void> => {
    const loginDetails = await AuthService.login(loginData.body as LoginReq);
    res.status(200).send(loginDetails);
};

export { login };
