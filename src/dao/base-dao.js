const logger = require('../utils/logger');
const _ = require('lodash');

class BaseDAO {    
    constructor(daoName, model) {
        this.daoName = daoName;
        this.Model = model;
        this.instances = [];
    }

    find(query) {
        if (!query) return this.instances;
        else if (typeof query === 'function') {
            return this.instances.filter(permission => query(permission))
        } else throw new Error('Unsupported Query Structure');
    }

    findOne(query) {
        if (!query) return null;
        else if (typeof query === 'function') {
            return this.instances.find(permission => query(permission));
        } else throw new Error('Unsupported Query Structure');
    }

    findById(id) {
        return this.instances.find(instance => instance.id === id);
    }

    create(payload) {
        try {
            let toInsert = null;
            if (Array.isArray(payload)) {
                toInsert = payload.map(instance => new this.Model(instance));
                this.instances.push(...toInsert);
            } else if (typeof payload === 'object') {
                toInsert = new this.Model(payload);
                this.instances.push(toInsert)
            }
            return toInsert;
        } catch (error) {
            logger.error(`${this.daoName}.create - Error Occurred - ${error.message}`);
            throw error;
        }
    }

    deleteById(id) {
        _.remove(this.instances, instance => instance.id === id);
        return true;
    }

    delete(query) {
        if (!query) return null;
        else if (typeof query === 'function') {
            return _.remove(this.instances, instance => query(instance));
        } else throw new Error('Unsupported Query Structure');
    }

    updateById(id, payload) {
        const index = this.instances.find(instance => instance.id === id);
        Object.keys(payload).forEach(k => {
            if (k !== 'id') this.instances[index] = payload[index]
        })
        return this.instances[index];
    }
}

module.exports = BaseDAO;