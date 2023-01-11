const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

let messageFormat = (method, message, apiUrl) => {
  return `${message} [${apiUrl}] [${method}]`;
};

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] [${message}]`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    format.colorize(),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    myFormat
  ),
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
  ],
});

module.exports = { logger, messageFormat };
