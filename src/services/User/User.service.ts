import { type User } from '@services/User/User.type';
import { ExtendedError } from '../../utils/error/error';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../../prisma/client';

const prisma = new PrismaClient();

const register = async (data: User): Promise<User> => {
    const user =
        (await prisma.user.findUnique({ where: { email: data.username } })) ||
        (await prisma.user.findUnique({ where: { username: data.username } }));

    const role = await prisma.role.findFirstOrThrow({
        where: { name: 'user' },
    });

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

    return await prisma.user.create({
        data: { ...userWithHashedPass, roleId: role.id },
    });
};

const userService = { register };

export default userService;
