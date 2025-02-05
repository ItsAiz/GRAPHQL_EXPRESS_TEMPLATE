require('dotenv').config();
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, errors, json, printf } = format;

let baseConfig;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const env = process.env.ENV || process.env.GCP_ENV || process.env.NODE_ENV || 'Unknown';

if (['Unknown'].includes(env)) {
  baseConfig = {
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    level: 'debug',
    transports: [new transports.Console()],
  };
} else {
  baseConfig = {
    level: 'info',
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'graphql-pracice-backend' },
    transports: [new transports.Console()],
  };
}

module.exports = createLogger(baseConfig);
