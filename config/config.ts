import dotenv from 'dotenv';
import Config from '../interfaces/config.interface';

dotenv.config();

const config: Config = {
    development: {
        port: process.env.PORT || 9999,
        mongoUrl: process.env.DB_URI,
        defaultUserImage: '5d752dd7492b893b84223fd4',
        JWT_SECRET: process.env.JWT_SECRET,
        socketPORT: 8888
    },
    production: {
        port: process.env.PORT,
        mongoUrl: process.env.PROD_MONGODB,
        defaultUserImage: '5d752dd7492b893b84223fd4',
        JWT_SECRET: process.env.JWT_SECRET,
        socketPORT: 8888
    }
}

export default config;