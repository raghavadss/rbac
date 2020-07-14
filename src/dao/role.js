const RoleModel = require('../models/role');
const BaseDAO = require('./base-dao');

class Role extends BaseDAO {

    constructor() {
        super(Role.name, RoleModel);
    }
    findByName(name) {
        return this.find().find(instance => instance.name === name);
    }
}
module.exports = new Role();