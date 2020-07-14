const BaseController = require('./base-controller');
const PermissionService = require('../services/permission');

class Permission extends BaseController {
    constructor() {
        super('permission', routes);
    }
}

const routes = [
    ['for-resource', PermissionService.findByResource],
];

module.exports = Permission;