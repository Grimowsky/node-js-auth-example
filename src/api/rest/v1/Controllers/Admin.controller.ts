import type { AppReq, AppRes } from '../../../../common/types/Request.type';
import AdminService from '@services/Admin/Admin.service';
const usersList = async (_req: AppReq, res: AppRes): Promise<void> => {
    const users = await AdminService.getAllUsers();
    res.status(200).send({ data: users });
};

export { usersList };
