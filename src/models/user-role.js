const BaseModel = require('./base-model');

class UserRole extends BaseModel {
    constructor(payload) {
        if (!payload.userId || !payload.roleId) throw new Error(`UserRole requires 'userId' and 'roleId' parameters`);
        super(UserRole);
        this.userId = payload.userId;
        this.roleId = payload.roleId;
        Object.freeze(this);
    }
}

module.exports = UserRole;