import { BaseConfig } from './interfaces/config.interface';
import generalConfig from './config/config';
import logger from './logger/logger';
import App from './App/App';
import AuthController from './controllers/AuthControllers';

// //init env 
const env = process.env.NODE_ENV || 'development';

const config: BaseConfig = generalConfig[env];

const app = new App([new AuthController()], config, logger);

app.listen();