const ResourceModel = require('../models/resource');
const BaseDAO = require('./base-dao');

class Resource extends BaseDAO {

    constructor() {
        super(Resource.name, ResourceModel);
    }
    findByName(name) {
        return this.find().find(instance => instance.name === name);
    }
}
module.exports = new Resource();