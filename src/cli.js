"use-strict";
const logger = require('./utils/logger');
const cliUtil = require('./utils/cli-util');

const init = (router) => {
  console.log('Please provide input:')
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', async (argString) => {
    argString = argString.trim().toLowerCase();
    if (!argString) return true;
    try {
      const { path, input } = cliUtil.extractInput(argString);
      const response = await router.forward(path, input);
      logger.info(JSON.stringify(response));
    } catch (err) {
      logger.error('Error - ' + err.message);
    }
    return true;
  }
  );
}

module.exports = { init };