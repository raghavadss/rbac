const BaseModel = require('./base-model');

class Permission extends BaseModel {  
    constructor(payload) {
        if (!payload.resourceId || !payload.actionTypeId) throw new Error(`UserRole requires 'userId' and 'roleId' parameters`);
        super(Permission);
        this.resourceId = payload.resourceId;
        this.actionTypeId = payload.actionTypeId;
        Object.freeze(this);
    }
}

module.exports = Permission;