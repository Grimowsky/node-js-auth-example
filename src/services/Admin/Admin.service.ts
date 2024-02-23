import { type User } from '@services/Admin/User.type';
import { PrismaClient } from '../../prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
        select: { username: true, email: true, role: true },
    });

    return users.map((user) => ({ ...user, role: user.role.name }));
};

const adminService = { getAllUsers };

export default adminService;
