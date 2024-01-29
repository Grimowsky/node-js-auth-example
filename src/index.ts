import * as http from 'http';
import { app } from './app';

const PORT = process?.env?.PORT || 8080;

const server = http.createServer(app);

const startServer = async (): Promise<void> => {
    server.listen(PORT, () => {
        console.log(`---Listening on port ${PORT}---`);
    });
};

void (async () => {
    await startServer();
})();
