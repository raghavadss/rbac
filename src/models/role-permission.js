const BaseModel = require('./base-model');

class RolePermission extends BaseModel {
    constructor(payload) {
        if (!payload.roleId || !payload.permissionId) throw new Error(`UserRole requires 'userId' and 'roleId' parameters`);
        super(RolePermission);
        this.roleId = payload.roleId;
        this.permissionId = payload.permissionId;
        Object.freeze(this);
    }
}

module.exports = RolePermission;