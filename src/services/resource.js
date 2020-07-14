const ResourceDAO = require('../dao/resource');
const eventHandler = require('../helpers/event-handler');

class Resource {
    async findByName(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            return await ResourceDAO.findByName(name);
        } catch (error) {
            throw error;
        }
    }
    
    async create(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = ResourceDAO.findByName(name);
            if (existing) throw new Error(`Resource ${name} already exists!`);
            const resource = await ResourceDAO.create({ name });
            eventHandler.eventEmitter.emit(eventHandler.DomainEvents.RESOURCE_CREATED,resource.id);
            return resource;
        } catch (error) {
            throw error;
        }
    }
    
    async remove(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = ResourceDAO.findByName(name);
            if (!existing) throw new Error(`No Resource found by name ${name}`);
            await ResourceDAO.deleteById(existing.id);
            //TODO: Raise event and remove all mapping Permissions, RolePermissions
            eventHandler.eventEmitter.emit(eventHandler.DomainEvents.RESOURCE_DELETED, existing.id);
            return true;
        } catch (error) {
            throw error;
        }
    }
    
    async update(payload) {
        try {
            if (!payload || !payload.name || !payload.newName) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = ResourceDAO.findByName(name);
            if (!existing) throw new Error(`No Resource found by name ${name}`);
            const updated = await ResourceDAO.updateById(existing.id, { name: newName });
            return updated;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new Resource();