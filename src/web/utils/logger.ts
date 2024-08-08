import pino from 'pino';

const levels = {
  info: pino.level.info,
  warn: pino.level.warn,
  debug: pino.level.debug,
  error: pino.level.error,
};

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

export const log = {
  info: (message: any, ...args: any[]) => {
    logger.info(message, ...args);
  },
  warn: (message: any, ...args: any[]) => {
    logger.warn(message, ...args);
  },
  debug: (message: any, ...args: any[]) => {
    logger.debug(message, ...args);
  },
  error: (message: any, ...args: any[]) => {
    logger.error(message, ...args);
  },
};