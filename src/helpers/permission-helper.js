const RoleDAO = require('../dao/role');
const ResourceDAO = require('../dao/resource');
const ActionTypeDAO = require('../dao/action-type');
const PermissionDAO = require('../dao/permission');
const RolePermissionDAO = require('../dao/role-permission');

class PermissionHelper {
    async resourcePermissionsForRole(payload) {
        try {
            if (!payload || !payload.role || !payload.resource || !payload.actionType) throw new Error(`'role', 'resource', 'actionType' are required parameters`);
            const { role, resource, actionType } = payload;
            const roleObj = await RoleDAO.findByName(role);
            const resourceObj = await ResourceDAO.findByName(resource);
            const actionTypeObj = await ActionTypeDAO.findByName(actionType);
            if (!roleObj) throw new Error(`Role not found by the name ${role}`);
            if (!resourceObj) throw new Error(`Resource not found by the name ${resource}`);
            if (!actionTypeObj) throw new Error(`ActionType not found by the name ${actionType}`);
            const permission = await PermissionDAO.findOne((permission) => permission.actionTypeId === actionTypeObj.id && permission.resourceId === resourceObj.id);
            if (!permission) throw new Error(`Permission not found for actionType ${actionType} and resource ${resource}`);
            const rolePermission = await RolePermissionDAO.findOne((rolePermission) => rolePermission.permissionId === permission.id && rolePermission.roleId === roleObj.id);
            return { rolePermission, permission, roleObj };
        } catch (error) {
            throw error;
        }
    }

    async allPermissionsForRole(payload) {
        try {
            if (!payload || !payload.role) throw new Error(`'role' is a required parameter`);
            const { role } = payload;
            const roleObj = await RoleDAO.findByName(role);
            if (!roleObj) throw new Error(`Role not found by the name ${role}`);
            const rolePermissions = await RolePermissionDAO.find((rolePermission) => rolePermission.roleId === roleObj.id);
            return rolePermissions;
        } catch (error) {
            throw error;
        }
    }

    async resourcePermissions(payload) {
        try {
            if (!payload || !payload.resource) throw new Error(`'resource' is a required parameter`);
            const { resource } = payload;
            const resourceObj = await ResourceDAO.findByName(resource);
            if (!resourceObj) throw new Error(`Resource not found by the name ${resource}`);
            const permissions = await PermissionDAO.find((permission) => permission.resourceId === resourceObj.id);
            if (!permissions || !permissions.length) return { rolePermissions: [], permissions: [] };
            const rolePermissions = await RolePermissionDAO.find((rolePermission) => permissions.map(p => p.id).includes(rolePermission.permissionId));
            return { rolePermissions, permissions };
        } catch (error) {
            throw error;
        }
    }

    async allPermissionsForMultipleRoles(payload) {
        try {
            if (!payload || !payload.roles) throw new Error(`'roles' is a required parameter`);
            const { roles } = payload;
            if (!roles.length) return [];
            const roleObjects = await RoleDAO.find((role) => roles.includes(role.id));
            if (!roleObjects || !roleObjects.length) throw new Error(`Roles not found by ids ${roles.join()}`);
            const rolePermissions = await RolePermissionDAO.find((rolePermission) => roleObjects.map(r => r.id).includes(rolePermission.roleId));
            return rolePermissions;
        } catch (error) {
            throw error;
        }
    }

    async resourcePermissionsForMultipleRoles(payload) {
        try {

            if (!payload || !payload.roles || !payload.resource || !payload.actionType) throw new Error(`'roles', 'resource', 'actionType' are required parameters`);
            const { roles, resource, actionType } = payload;
            if (!roles.length) return [];
            const roleObjects = await RoleDAO.find((role) => roles.includes(role.id));
            if (!roleObjects || !roleObjects.length) throw new Error(`Roles not found by ids ${roles.join()}`);
            const resourceObj = await ResourceDAO.findByName(resource);
            const actionTypeObj = await ActionTypeDAO.findByName(actionType);            
            if (!resourceObj) throw new Error(`Resource not found by the name ${resource}`);
            if (!actionTypeObj) throw new Error(`ActionType not found by the name ${actionType}`);
            const permission = await PermissionDAO.findOne((permission) => permission.actionTypeId === actionTypeObj.id && permission.resourceId === resourceObj.id);
            if (!permission) throw new Error(`Permission not found for actionType ${actionType} and resource ${resource}`);
            const rolePermissions = await RolePermissionDAO.find((rolePermission) => rolePermission.permissionId === permission.id && roleObjects.map(r => r.id).includes(rolePermission.roleId));
            return { rolePermissions, permission };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new PermissionHelper();