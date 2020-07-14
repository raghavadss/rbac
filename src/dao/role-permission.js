const RolePermissionModel = require('../models/role-permission');
const BaseDAO = require('./base-dao');

class RolePermission extends BaseDAO {

    constructor() {
        super(RolePermission.name, RolePermissionModel);
    }
}
module.exports = new RolePermission();