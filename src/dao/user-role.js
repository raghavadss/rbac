const UserRoleModel = require('../models/user-role');
const BaseDAO = require('./base-dao');

class UserRole extends BaseDAO {

    constructor() {
        super(UserRole.name, UserRoleModel);
    }    
}
module.exports = new UserRole();