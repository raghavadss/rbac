const ActionTypeDAO = require('../dao/action-type');

class ActionType {
    async findByName(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            return await ActionTypeDAO.findByName(name);
        } catch (error) {
            throw error;
        }
    }

    async create(payload) {
        try {
            if (!payload || !payload.name) throw new Error(`'name' is a required parameter`);
            const { name } = payload;
            const existing = this.findByName({ name });
            if (existing) throw new Error(`ActionType ${name} already exists!`);
            const actionType = await ActionTypeDAO.create({ name });
            return actionType;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = new ActionType();