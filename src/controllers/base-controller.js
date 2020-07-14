const { routeMap } = require('./route-map');

class BaseController {
    constructor(basePath, routes) {
        this.initRoutes(basePath, routes);
    }
    initRoutes(basePath, routes) {
        routes.forEach(route => {
            routeMap[`${basePath}-${route[0]}`] = route[1];
        });
    }
}

module.exports = BaseController;