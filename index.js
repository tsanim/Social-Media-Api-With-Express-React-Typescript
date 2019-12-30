//init env 
const env = process.env.NODE_ENV || 'development';

//init config object
import generalConfig from './config/config';

const config = generalConfig[env];

//init winston
import winston from 'winston';

/**
   * Requiring `winston-mongodb` will expose
   * `winston.transports.MongoDB`
*/
import { mongoDB } from 'winston-mongodb'

//init logger
import logger from './logger/logger';

logger.add(new winston.transports.MongoDB({
    level: 'error',
    db: config.mongoUrl,
    collection: 'logs'
}));

if (env !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'info'
    }));
}

//init express, http, socketio
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import favicon from 'express-favicon';
import path from 'path';

//init db
import db from './config/database';
db(config, logger)

//init app
const app = express();

//init express
import initExpress from './config/express';
initExpress(app)

//init routes
import initRoutes from './config/routes';
initRoutes(app)

//init socketio
import initSocketIo from './socketio/socketio';
initSocketIo(express, socketio, http, config.socketPORT, logger);

// General error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;

    logger.log('error', `Error message: ${message}, Error status: ${status}`, ...error);

    res.status(status).json({ message, error });
    next();
})

app.use(favicon('client/iwi-app/build/iwi_logo.png'));

app.use(express.static(path.join(__dirname, '/client/iwi-app/build')));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.get('*', (request, response) => {
        response.sendFile(path.resolve('./', 'client', 'iwi-app', 'build', 'index.html'));
    });
}

app.listen(config.port, () => console.log(`Server is listening to port ${config.port}`));

