// @ts-check

import path from 'path';
import winston from 'winston';
import * as dotEnv from 'dotenv-safe';

const env = dotEnv.load({
  path: 'src/app/env/.env',
  sample: 'src/app/env/.env.example',
  allowEmptyValues: true
});

/*
########################################
                        Winston Setup

Create transport streams and add to Winston
########################################
*/
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');

const logDir = '../logs';

const devWinstonConsoleStream = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  colorize: true,
  humanReadableUnhandledException: true
});
const devWinstonInfoStream = new winston.transports.DailyRotateFile({
  level: 'info',
  name: 'log.info',
  filename: path.join(
    __dirname,
    '../../server/logs/info',
    'log.info'
  ),
  datePattern: '.yyyy-MM-dd',
  createTree: true,
  handleExceptions: false,
  json: true,
  maxsize: 5242880,
  maxFiles: 10,
  colorize: false
});
const devWinstonWarnStream = new winston.transports.DailyRotateFile({
  level: 'warn',
  name: 'log.warn',
  filename: path.join(
    __dirname,
    '../../server/logs/warnings',
    'log.warnings'
  ),
  datePattern: '.yyyy-MM-dd',
  createTree: true,
  handleExceptions: false,
  json: true,
  maxsize: 5242880,
  maxFiles: 10,
  colorize: false
});
const devWinstonErrorStream = new winston.transports.DailyRotateFile({
  level: 'error',
  name: 'log.error',
  filename: path.join(
    __dirname,
    '../../server/logs/errors',
    'log.errors'
  ),
  datePattern: '.yyyy-MM-dd',
  createTree: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  json: true,
  prettyPrint: true,
  maxsize: 5242880,
  maxFiles: 10,
  colorize: false
});

const devWinstonConsoleLogger = new winston.Logger({
  transports: [devWinstonConsoleStream],
  exitOnError: false
});
devWinstonConsoleLogger.stream = {
  write: (message, encoding) => {
    devWinstonConsoleLogger.debug(message);
  }
};

const devWinstonInfoLogger = new winston.Logger({
  transports: [devWinstonInfoStream],
  exitOnError: false
});
devWinstonInfoLogger.stream = {
  write: (message, encoding) => {
    devWinstonInfoLogger.info(message);
  }
};

const devWinstonWarningLogger = new winston.Logger({
  transports: [devWinstonWarnStream],
  exitOnError: false
});
devWinstonWarningLogger.stream = {
  write: (message, encoding) => {
    devWinstonWarningLogger.warn(message);
  }
};

const devWinstonErrorLogger = new winston.Logger({
  transports: [devWinstonErrorStream],
  exitOnError: false
});
devWinstonErrorLogger.stream = {
  write: (message, encoding) => {
    devWinstonErrorLogger.error(message);
  }
};

const loggers = {
  console: devWinstonConsoleLogger,
  info: devWinstonInfoLogger,
  warning: devWinstonWarningLogger,
  error: devWinstonErrorLogger
};

// TODO: Add customized message to print out
// TODO: Get decoupled logging between Console and the File streams

module.exports = loggers;