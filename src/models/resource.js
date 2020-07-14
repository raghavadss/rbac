const BaseModel = require('./base-model');

class Resource extends BaseModel{
    constructor(payload) {        
        if (!payload.name) throw new Error(`Resource requires 'name' parameter`);
        super(Resource);
        this.name = payload.name;
        Object.freeze(this);
    }
}
module.exports = Resource;