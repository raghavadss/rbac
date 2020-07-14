const RoleDAO = require('../dao/role');
const ResourceDAO = require('../dao/resource');
const ActionTypeDAO = require('../dao/action-type');
const PermissionDAO = require('../dao/permission');
const RolePermissionDAO = require('../dao/role-permission');
const permissionHelper = require('../helpers/permission-helper');

class RolePermission {
    async grant(payload) {
        try {
            const { rolePermission, permission, roleObj } = await permissionHelper.resourcePermissionsForRole(payload);
            if (rolePermission) throw new Error('Permission already exists');
            else return await RolePermissionDAO.create({ roleId: roleObj.id, permissionId: permission.id });
        } catch (error) {
            throw error;
        }
    }

    async revoke(payload) {
        try {
            const { rolePermission, permission } = await permissionHelper.resourcePermissionsForRole(payload);
            if (!rolePermission) throw new Error(`Permission doesn't exist`);
            else return await RolePermissionDAO.deleteById(rolePermission.id);
        } catch (error) {
            throw error;
        }
    }

    async findByRole(payload) {
        try {
            const permissions = await permissionHelper.allPermissionsForRole(payload);
            return permissions;
        } catch (error) {
            throw error;
        }
    }

    async findByResource(payload) {
        try {
            const { rolePermissions } = await permissionHelper.resourcePermissions(payload);
            return rolePermissions;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new RolePermission()