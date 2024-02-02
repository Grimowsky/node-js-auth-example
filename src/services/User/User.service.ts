import { type User } from '@services/User/User.type';
import UserRepository from '@repository/User';
import { ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';

// user request
// username || email exits -> error
// register with encrypted password

const register = async (data: User): Promise<User> => {
    if (
        (await UserRepository.findByEmail(data.email)) ||
        (await UserRepository.findByUserName(data.username))
    ) {
        throw ExtendedError.of(
            'Username or email has been taken',
            StatusCodes.BAD_REQUEST
        );
    }

    const userWithHashedPass: User = {
        ...data,
        password: await bcrypt.hash(data.password, 10),
    };

    return await UserRepository.create(userWithHashedPass);
};

const userService = { register };

export default userService;
