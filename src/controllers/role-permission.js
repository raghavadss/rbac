const BaseController = require('./base-controller');
const RolePermissionService = require('../services/role-permission');

class RolePermission extends BaseController {
    constructor() {
        super('rp', routes);
    }
}

const routes = [
    ['grant', RolePermissionService.grant],
    ['revoke', RolePermissionService.revoke],
    ['for-role', RolePermissionService.findByRole],
    ['for-resource', RolePermissionService.findByResource],
]

module.exports = RolePermission;