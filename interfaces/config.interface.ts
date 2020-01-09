export interface BaseConfig {
    port: number | string | undefined;
    mongoUrl: string | undefined;
    defaultUserImage: string;
    JWT_SECRET: string | undefined;
    socketPORT: number;
}

export default interface Config {
    development: BaseConfig;
    production: BaseConfig;
}