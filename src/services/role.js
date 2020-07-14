const RoleDAO = require('../dao/role');
const ResourceDAO = require('../dao/resource');
const ActionTypeDAO = require('../dao/action-type');
const PermissionDAO = require('../dao/permission');
const RolePermissionDAO = require('../dao/role-permission');
const permissionHelper = require('../helpers/permission-helper');

class Role {
    async findByName(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            return await RoleDAO.findByName(name);
        } catch (error) {
            throw error;
        }
    }

    async create(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = RoleDAO.findByName(name);
            if (existing) throw new Error(`Role ${name} already exists!`);
            const resource = await RoleDAO.create({ name });
            return resource;
        } catch (error) {
            throw error;
        }
    }

    async can(payload) {
        try {
            const { rolePermission } = await permissionHelper.resourcePermissionsForRole(payload);
            if (rolePermission) return true;
            else return false;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new Role();