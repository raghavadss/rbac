const util = require('../utils/decorators');

class BaseModel {
    constructor(model){
        this.id = util.incrementId(model);
    }
}

module.exports = BaseModel;