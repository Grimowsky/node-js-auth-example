import { type User } from '@services/User/User.type';
import UserRepository from '@repository/User';

const register = async (data: User): Promise<User> => {
    return await UserRepository.create(data);
};

const userService = { register };

export default userService;
