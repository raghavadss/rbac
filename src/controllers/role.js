const BaseController = require('./base-controller');
const RoleService = require('../services/role');

class Role extends BaseController {
    constructor() {
        super('role', routes);
    }
}

const routes = [
    ['create', RoleService.create],
    ['can', RoleService.can],
]

module.exports = Role;