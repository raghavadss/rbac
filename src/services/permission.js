const permissionHelper = require('../helpers/permission-helper');
const eventHandler = require('../helpers/event-handler');
const ActionTypeDAO = require('../dao/action-type');
const PermissionDAO = require('../dao/permission');
const RolePermissionDAO = require('../dao/role-permission');

class Permission {
    constructor() {
        this.listeners = {
            ResourceCreated: eventHandler.eventEmitter.on(eventHandler.DomainEvents.RESOURCE_CREATED, this.addPermissions),
            ResourceDeleted: eventHandler.eventEmitter.on(eventHandler.DomainEvents.RESOURCE_DELETED, this.removePermissions)
        }
    }

    async findByResource(payload) {
        try {
            const { permissions } = await permissionHelper.resourcePermissions(payload)
            return permissions;
        } catch (error) {
            throw error;
        }
    }

    async addPermissions(id) {
        try {
            const actionTypes = await ActionTypeDAO.find();
            const existing = await PermissionDAO.find((permission) => permission.resourceId === id);
            if (existing && existing.length) return true;
            else {
                const permissions = await PermissionDAO.create(actionTypes.map(actionType => ({ actionTypeId: actionType.id, resourceId: id })));
                return permissions;
            }            
        } catch (error) {
            throw error;
        }
    }

    async removePermissions(id) {
        try {
            const permissions = await PermissionDAO.find((permission) => permission.resourceId === id);
            await RolePermissionDAO.delete((rolePermission) => permissions.map(p=>p.id).includes(rolePermission.permissionId));
            await PermissionDAO.delete((permission) => permission.resourceId === id);
            return {removed: true}
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Permission()