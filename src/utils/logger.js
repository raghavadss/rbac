const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)),
    level: 'debug',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true, colors: { error: 'red', info: 'green', debug: 'blue' } }), winston.format.timestamp(), winston.format.printf(info => `[${info.level}]: ${info.message}`))
        })
    ],
});

module.exports = logger;
