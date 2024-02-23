import { type User } from '@services/User/User.type';
import { ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import prisma from '../../prisma/prisma-client';

const USER = prisma.user;
const ROLES = prisma.role;
const register = async (data: User): Promise<User> => {
    const user =
        (await USER.findUnique({ where: { email: data.username } })) ||
        (await USER.findUnique({ where: { username: data.username } }));

    const role = await ROLES.findFirstOrThrow({ where: { name: 'user' } });

    if (user) {
        throw ExtendedError.of(
            'Username or emails has been taken',
            StatusCodes.BAD_REQUEST
        );
    }

    const userWithHashedPass: User = {
        ...data,
        password: await bcrypt.hash(data.password, 10),
    };

    return await USER.create({
        data: { ...userWithHashedPass, roleId: role.id },
    });
};

const userService = { register };

export default userService;
