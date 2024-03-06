import adminService from '../Admin.service';
import { prismaMock } from '../../../utils/tests/prisma';

describe('AdminService', () => {
    it('should return all users', async () => {
        const users = [
            {
                id: 1,
                name: 'Rich',
                email: 'test@example.com',
                role: { name: 'user' },
            },
        ];

        //error due that prisma mock is not aware of select method
        //@ts-expect-error
        prismaMock.user.findMany.mockResolvedValue(users);

        const result = await adminService.getAllUsers();
        expect(result).toEqual([
            {
                id: 1,
                name: 'Rich',
                email: 'hello@prisma.io',
                role: 'user',
            },
        ]);
    });
});
