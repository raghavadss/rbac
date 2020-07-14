const BaseModel = require('./base-model');

class Role extends BaseModel{
    constructor(payload) {        
        if (!payload.name) throw new Error(`Role requires 'name' parameter`);
        super(Role);
        this.name = payload.name;
        Object.freeze(this);
    }
}
module.exports = Role;