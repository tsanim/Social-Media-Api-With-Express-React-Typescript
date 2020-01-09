import { BaseConfig } from './interfaces/config.interface';
import generalConfig from './config/config';
import logger from './logger/logger';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import favicon from 'express-favicon';
import path from 'path';
import db from './config/database';
import initExpress from './config/express';
import initRoutes from './config/routes';
import initSocketIo from './socketio/socketio';
import winston from 'winston';

// //init env 
const env = process.env.NODE_ENV || 'development';

const config: BaseConfig = generalConfig[env];

//init winston

/**
   * Requiring `winston-mongodb` will expose
   * `winston.transports.MongoDB`
*/
// import { mongoDB } from 'winston-mongodb'

// logger.add(new transports.MongoDB({
//     level: 'error',
//     db: config.mongoUrl,
//     collection: 'logs'
// }));

// if (env !== 'production') {
//     logger.add(new winston.transports.Console({
//         level: 'info'
//     }));
// }

// //init db
// db(config, logger)

// //init app
// const app = express();

// //init express
// initExpress(app)

// //init routes
// initRoutes(app)

// //init socketio
// initSocketIo(express, socketio, http, config.socketPORT, logger);

// // General error handling


// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.get('*', (request, response) => {
//         response.sendFile(path.resolve('./', 'client', 'iwi-app', 'build', 'index.html'));
//     });
// }

// app.listen(config.port, () => console.log(`Server is listening to port ${config.port}`));

import App from './appp';
import AuthController from './controllers/AuthControllers';

const app = new App([new AuthController()], config, logger);

app.listen();