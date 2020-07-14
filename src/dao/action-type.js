const ActionTypeModel = require('../models/action-type');
const ActionTypes = require('../constants/action-types');
const BaseDAO = require('./base-dao');

class ActionType extends BaseDAO {
    constructor() {
        super(ActionType.name, ActionTypeModel);
        this.create(Object.values(ActionTypes).map(actionType => ({ name: actionType })))
    }
    findByName(name) {
        return this.find().find(instance => instance.name === name);
    }
}
module.exports = new ActionType();