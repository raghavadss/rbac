const BaseController = require('./base-controller');
const ActionTypeService = require('../services/action-type');

class ActionType extends BaseController {
    constructor() {
        super('actiontype', routes);
    }
}

const routes = [
    ['create', ActionTypeService.create],
    ['find', ActionTypeService.findByName]
]

module.exports = ActionType;