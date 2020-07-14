const UserDAO = require('../dao/user');
const RoleDAO = require('../dao/role');
const UserRoleDAO = require('../dao/user-role');
const logger = require('../utils/logger');
const permissionHelper = require('../helpers/permission-helper');

const getUserRoles = async (name) => {
    const user = await UserDAO.findByName(name);
    if (!user) throw new Error(`User not found with name ${name}`);
    const userRoles = await UserRoleDAO.find((userRole) => userRole.userId === user.id);
    return { user, userRoles }
}

class User {
    async findByName(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            return UserDAO.findByName(name);
        } catch (error) {
            throw error;
        }
    }

    async create(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = UserDAO.findByName(name);
            if (existing) throw new Error(`User ${name} already exists!`);
            const resource = await UserDAO.create({ name });
            return resource;
        } catch (error) {
            throw error;
        }
    }

    async update(payload) {
        try {
            if (!payload || !payload.name || !payload.newName) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = UserDAO.findByName(name);
            if (!existing) throw new Error(`No User found by name ${name}`);
            const updated = await UserDAO.updateById(existing.id, { name: newName });
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async addRole(payload) {
        try {
            if (!payload || !payload.name || !payload.role) throw new Error(`'name', 'role' are required`);
            const { name, role } = payload;
            const { user, userRoles } = await getUserRoles(name);
            const roleObj = await RoleDAO.findByName(role);
            if (!roleObj) throw new Error(`No role found with the name ${role}`);
            const isExistingRole = userRoles.find(userRole => userRole.roleId === roleObj.id);
            if (isExistingRole) throw new Error(`Role with the name ${role} is already assigned to the user ${name}`);
            return await UserRoleDAO.create({ userId: user.id, roleId: roleObj.id });
        } catch (error) {
            throw error;
        }
    }

    async removeRole(payload) {
        try {
            if (!payload || !payload.name || !payload.role) throw new Error(`'name', 'role' are required`);
            const { name, role } = payload;
            const { user, userRoles } = await getUserRoles(name);
            const roleObj = await RoleDAO.findByName(role);
            if (!roleObj) throw new Error(`No role found with the name ${role}`);
            const roleToRemove = userRoles.find(userRole => userRole.roleId === roleObj.id);
            if (!roleToRemove) throw new Error(`No role with the name ${role} is assigned to the user ${name}`);
            await UserRoleDAO.deleteById(roleToRemove.id);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async can(payload) {
        try {
            if (!payload || !payload.name || !payload.resource || !payload.actionType) throw new Error(`'name', 'resouce', 'actionType' are required`);
            const { name, resource, actionType } = payload;
            const { user, userRoles } = await getUserRoles(name);
            if (!userRoles || !userRoles.length) return false;
            const { rolePermissions } = await permissionHelper.resourcePermissionsForMultipleRoles({ resource, actionType, roles: userRoles.map(r => r.roleId) });
            if (rolePermissions && rolePermissions.length) return true;
            else return false;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = new User();