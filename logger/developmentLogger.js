const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] [${message}]`;
});

const developmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      timestamp({
        format: "MMM-DD-YYYY HH:mm:ss",
      }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

module.exports = developmentLogger;
