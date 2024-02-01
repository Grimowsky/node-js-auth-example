import prisma from '../prisma/prisma-client';
import { type User } from '@controllers/Registration.controller';

const create = async (userData: User): Promise<User> => {
    return await prisma.user.create({ data: userData });
};

export default { create };
