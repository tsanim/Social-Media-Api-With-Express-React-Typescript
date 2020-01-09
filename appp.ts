import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import db from './config/database';
import initExpress from './config/express';
import initSocketIo from './socketio/socketio';
import { BaseConfig } from './interfaces/config.interface';

class App {
    public app: express.Application;

    constructor(public controllers: any, public config: BaseConfig, public logger: any) {
        this.app = express();

        this.initDatabase();
        this.initMiddlewares();
        this.initRoutes();
        this.initializeSocketIo();
    }

    private initDatabase() {
        db(this.config, this.logger);
    }

    private initMiddlewares() {
        initExpress(this.app);
    }

    private initRoutes() {
        this.controllers.forEach(controller => {
            this.app.use(controller.path, controller.router)
        });
    }

    private initializeSocketIo() {
        initSocketIo(express, socketio, http, this.config.socketPORT, this.logger);
    }

    public listen() {
        this.app.listen(this.config.port, () => {
            console.log(`App listening on the port ${this.config.port}`);
        });
    }
}

export default App;