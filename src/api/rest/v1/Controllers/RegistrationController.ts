import type { AppReq, AppRes } from '../../../../common/types/Request.type';
import { type User } from '@services/User/User.type';
import UserService from '@services/User/User.service';
const register = async (req: AppReq, res: AppRes): Promise<void> => {
    const userData: User = req.body;
    await UserService.register(userData);
    res.status(200).send({ ok: true });
};

const RegistrationController = { register };

export default RegistrationController;
