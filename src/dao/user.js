const UserModel = require('../models/user');
const BaseDAO = require('./base-dao');

class User extends BaseDAO {

    constructor() {
        super(User.name, UserModel);
    }
    findByName(name) {
        return this.find().find(instance => instance.name === name);
    }
}
module.exports = new User();