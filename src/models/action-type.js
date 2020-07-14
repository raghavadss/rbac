const BaseModel = require('./base-model');

class ActionType extends BaseModel {
    constructor(payload) {        
        if (!payload.name) throw new Error(`ActionType requires 'name' parameter`);
        super(ActionType);
        this.name = payload.name;
        Object.freeze(this);
    }    
}

module.exports = ActionType;