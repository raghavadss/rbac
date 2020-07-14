const PermissionModel = require('../models/permission');
const BaseDAO = require('./base-dao');

class Permission extends BaseDAO {

    constructor() {
        super(Permission.name, PermissionModel);
    }
}
module.exports = new Permission();