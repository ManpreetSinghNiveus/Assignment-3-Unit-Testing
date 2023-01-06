const winston = require("winston");
const { stringify } = require("flatted");
const { combine, timestamp, errors } = winston.format;

const myFormat = winston.format.printf((info) =>
  typeof info.message === "object"
    ? stringify({
        ...info.message,
        level: info.level,
        timestamp: info.timestamp,
        error: info.error
          ? info.error.message
            ? info.error.message
            : info.error
          : undefined,
      })
    : stringify(info)
);

const productionLogger = () => {
  return winston.createLogger({
    level: "debug",
    format: combine(
      timestamp(),
      errors({ stack: true }), // <-- use errors format
      myFormat
    ),

    transports: [
      new winston.transports.Console({
        level: "debug",
        handleExceptions: true,
        json: true,
        colorize: true,
      }),
    ],
    exitOnError: false,
  });
};

module.exports = productionLogger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  },
};
