const logger = require('./logger');

const extractInput = (string) => {
    const regex = /(?:[^\s"]+|"[^"]*")+/g;
    const args = string.match(regex).filter(x => x);
    const path = args[0];
    const input = {};
    try {
        for (let i = 1; i < args.length - 1; i++) {
            if (args[i][0] === '-') {
                const key = args[i].slice(1);
                if (input[key]) {
                    const error = new Error(`Invalid Input - parameter '${key}' is repeated`);
                    throw error;
                } else {
                    input[key] = args[i + 1].replace(/"/g, '');
                    i++;
                }
            }
        }
        return { path, input }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    extractInput
}