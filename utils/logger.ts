import dotenv from 'dotenv';
import { format, createLogger, transports, LoggerOptions } from 'winston';

dotenv.config();

const { timestamp, combine, errors, json, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const env: string = process.env.ENV || process.env.GCP_ENV || process.env.NODE_ENV || 'Unknown';

let baseConfig: LoggerOptions;

if (env === 'Unknown') {
  baseConfig = {
    format: combine(
      colorize(),
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

export const logger = createLogger(baseConfig);