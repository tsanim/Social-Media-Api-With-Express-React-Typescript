//require winston 
import { createLogger, transports, format } from 'winston';
const LEVEL = Symbol.for('level');

/**
 * Log only the messages the match `level`.
 */
function filterOnly(level) {
    return format(function (info) {
        if (info[LEVEL] === level) {
            return info;
        }
    })();
}

export default createLogger({
    levels: {
        debug: 0,
        error: 1,
        warn: 2,
        info: 3
    },
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: `${__dirname}/logger/errorsLogs.log`,
            format: filterOnly('error'),
            level: 'error'
        }),
        new transports.File({
            filename: `${__dirname}/logger/infoLogs.log`,
            format: filterOnly('info'),
            level: 'info'
        }),
        new transports.File({
            filename: `${__dirname}/logger/debugLogs.log`,
            format: filterOnly('debug'),
            level: 'debug'
        }),
        new transports.File({
            filename: `${__dirname}/logger/warnLogs.log`,
            format: filterOnly('warn'),
            level: 'warn'
        })
    ]
});