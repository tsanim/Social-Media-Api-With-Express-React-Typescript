import express from 'express';
import db from '../config/database';
import initilializeMiddlewaresExpress from '../config/express';
import initSocketIo from '../socketio/socketio';
import { BaseConfig } from '../interfaces/config.interface';
import { Logger } from 'winston';
import Controller from '../interfaces/Controller.interface';

class App {
    public app: express.Application;

    constructor(public controllers: Controller[], public config: BaseConfig, public logger: Logger) {
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
        initilializeMiddlewaresExpress(this.app);
    }

    private initRoutes() {
        this.controllers.forEach((controller: Controller) => {
            this.app.use(controller.path, controller.router)
        });
    }

    private initializeSocketIo() {
        initSocketIo(this.app, this.config.socketPORT, this.logger);
    }

    public listen() {
        this.app.listen(this.config.port, () => {
            console.log(`App listening on the port ${this.config.port}`);
        });
    }
}

export default App;