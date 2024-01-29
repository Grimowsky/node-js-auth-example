export const exampleService = async (): Promise<{ hello: string }> => {
    return await new Promise((resolve) => {
        resolve({ hello: 'world' });
    });
};
