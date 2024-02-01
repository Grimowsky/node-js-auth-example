import prisma from '../prisma/prisma-client';
import type { User } from '@services//User/User.type';
const create = async (userData: User): Promise<User> => {
    return await prisma.user.create({ data: userData });
};

export default { create };
