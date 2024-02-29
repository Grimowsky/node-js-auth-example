import { test } from './file';

describe('test', () => {
    it('should test', () => {
        const res = test(1, 1);
        expect(res).toBe(2);
    });
});
