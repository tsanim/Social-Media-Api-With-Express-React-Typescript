import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import User from '../models/User';
import { BaseConfig } from '../interfaces/config.interface';
import { Logger } from 'winston';

export default ({ mongoUrl }: BaseConfig, logger: Logger): void => {
    mongoose.connect(mongoUrl as string, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.once('open', (err) => {
        if (err) logger.log('error', `Database error`, ...err);

        //Seed Admin with once open database
        User.seedAdmin()
            .then(()=> {
                console.log('Database is ready!');
            }).catch((err: any) => {
                logger.log('error', `User seed admin error.`, ...err);
            });
    });

    db.on('error', (reason) => {
        logger.log('error', `Database error.`, ...reason);
    });
};