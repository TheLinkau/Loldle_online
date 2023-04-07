import bodyParser from 'body-parser';
import express, { Application, Router } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Config } from '../config';
import { getRoutes } from './routes';
import { SocketController } from '../controller/socker.controller';
import { RelationalDatabase } from './database/database';

export class Server {
    public expressServer: Application;
    public httpServer: http.Server;
    public socketIOServer: SocketIOServer;
    public socketController: SocketController;

    constructor(private readonly config: Config) {
        this.config = config;

        this.expressServer = express();
        this.httpServer = http.createServer(this.expressServer);

        this.expressServer.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, DELETE'
            );
            next();
        });

        this.socketIOServer = new SocketIOServer(this.httpServer, {
            cors: {
                origin: "*",
            }
        });
        this.socketController = new SocketController(this.socketIOServer);

        /**
         * Health Check endpoints
         */
        this.expressServer.get('/status', (req, res) => {
            res.status(200).end();
        });

        // Middleware that transforms the raw string of req.body into json
        this.expressServer.use(bodyParser.json());

        // Initialize the Socket.IO controller
        this.socketController.init();
    }

    private route(routes: Router[]) {
        // Load API routes
        this.expressServer.use('/api', routes);
    }

    async init(database: RelationalDatabase): Promise<void> {
        this.route(getRoutes(database));
    }

    async start(): Promise<void> {
        this.httpServer.listen(this.config.server.port, () => {
            console.log(`
            ################################################
            🛡️  Server listening on port: ${this.config.server.port} 🛡️ 
            ################################################
          `);
        });
    }
}
