const BaseController = require('./base-controller');
const ResourceService = require('../services/resource');

class Resource extends BaseController {
    constructor() {
        super('resource', routes);
    }
}

const routes = [
    ['create', ResourceService.create],
    ['remove', ResourceService.remove],
    ['update', ResourceService.update],
    ['find', ResourceService.findByName],
]

module.exports = Resource;