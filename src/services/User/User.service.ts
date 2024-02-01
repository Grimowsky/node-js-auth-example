import { type User } from '@services/User/User.type';
import UserRepository from '@repository/User';
import { ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';

const register = async (data: User): Promise<User> => {
    if (
        (await UserRepository.findByEmail(data.email)) ||
        (await UserRepository.findByUserName(data.username))
    ) {
        throw ExtendedError.of('user taken', StatusCodes.BAD_REQUEST);
    }

    return await UserRepository.create(data);
};

const userService = { register };

export default userService;
