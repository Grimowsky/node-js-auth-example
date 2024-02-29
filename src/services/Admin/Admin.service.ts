import { type User } from '@services/Admin/User.type';
import { PrismaClient } from '../../prisma/client';
import logger from '../../config/logger';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
    logger.info('Admin.service: getAllUsers called');
    const users = await prisma.user.findMany({
        select: { username: true, email: true, role: true },
    });

    return users.map((user) => ({ ...user, role: user.role.name }));
};

const adminService = { getAllUsers };

export default adminService;
