import prisma from '../prisma/prisma-client';
import type { User } from '@services//User/User.type';

const USER = prisma.user;
const create = async (userData: User): Promise<User> => {
    return await USER.create({ data: userData });
};

const findByEmail = async (email: string): Promise<User | null> => {
    return await USER.findUnique({ where: { email } });
};

const findByUserName = async (username: string): Promise<User | null> => {
    return await USER.findUnique({ where: { username } });
};

export default { create, findByEmail, findByUserName };
