const ActionType = require('./action-type');
const Resource = require('./resource');
const Role = require('./role');
const User = require('./user');
const Permission = require('./permission');
const RolePermission = require('./role-permission');

const { routeMap } = require('./route-map');

const load = () => {
    new ActionType();
    new Resource();
    new Role();
    new User();
    new Permission();
    new RolePermission();
}

const forward = async (path, payload) => {
    if(!path || !routeMap[path]) throw new Error(`Invalid path - ${path}`);
    return await routeMap[path](payload);
}

module.exports = { load, routeMap, forward }