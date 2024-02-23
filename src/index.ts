import * as http from 'http';
import { app } from './app';

const PORT = process?.env?.PORT || 8080;

const server = http.createServer(app);

const startServer = async (): Promise<void> => {
    server.listen(8080, '0.0.0.0', 0, () => {
        console.log(`---Listening on port ${PORT}---`);
    });
};

void (async () => {
    await startServer();
})();
