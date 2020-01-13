import dotenv from 'dotenv';
import { BaseConfig } from '../interfaces/config.interface';

dotenv.config();

class Configuration {
    private development: BaseConfig = {
        port: process.env.PORT || 9999,
        mongoUrl: process.env.DB_URI,
        defaultUserImage: '5d752dd7492b893b84223fd4',
        JWT_SECRET: process.env.JWT_SECRET,
        socketPORT: 8888
    }

    private production: BaseConfig = {
        port: process.env.PORT,
        mongoUrl: process.env.PROD_MONGODB,
        defaultUserImage: '5d752dd7492b893b84223fd4',
        JWT_SECRET: process.env.JWT_SECRET,
        socketPORT: 8888
    }

    constructor(private environment: string) {

    }

    get environmentConfig() {
        if(this.environment === 'development') {
            return this.development;
        } else {
            return this.production;
        }
    }
}

export default Configuration;