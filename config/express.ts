import bodyParser from 'body-parser';
import logger from '../logger/logger';
import path from 'path';
import express from 'express';

export default (app: express.Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

  app.use((error: { statusCode: number; message: string }, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message;

    logger.log('error', `Error message: ${message}, Error status: ${status}`);

    res.status(status).json({ message, error });
    next();
  });

  app.use(express.static(path.join(__dirname, '/client/iwi-app/build')));
}

