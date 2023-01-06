const developmentLogger = require("./developmentLogger");
const productionLogger = require("./productionLogger");
let logger = null;

let messageFormat = (method, message, apiUrl) => {
  return `${message} [${apiUrl}] [${method}]`;
};

if (process.env.NODE_ENV == "development") {
  logger = developmentLogger();
}

if (process.env.NODE_ENV == "production") {
  logger = productionLogger();
}

module.exports = { logger, messageFormat };
