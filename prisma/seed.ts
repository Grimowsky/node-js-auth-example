import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createRoles = async (): Promise<void> => {
    await prisma.role.createMany({
        data: [
            {
                name: 'admin',
            },
            {
                name: 'user',
            },
        ],
    });
};

const main = async (): Promise<void> => {
    try {
        await createRoles();
    } catch (e) {
        console.error(e);
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    });
