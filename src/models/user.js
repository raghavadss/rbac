const BaseModel = require("./base-model");

class User extends BaseModel {
    constructor(payload) {        
        if (!payload.name) throw new Error(`User requires 'name' parameter`);
        super(User);
        this.name = payload.name;
    }
}
module.exports = User;