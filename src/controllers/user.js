const BaseController = require('./base-controller');
const UserService = require('../services/user');

class User extends BaseController {
    constructor() {
        super('user', routes);
    }
}

const routes = [
    ['create', UserService.create],
    ['update', UserService.update],
    ['remove', UserService.remove],
    ['add-role', UserService.addRole],
    ['rm-role', UserService.removeRole],
    ['can', UserService.can],
]

module.exports = User;