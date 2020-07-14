const router = require('./controllers/index');
const logger = require('./utils/logger');
const async = require('async');
router.load();
const Promise = require('bluebird');

const cli = require('./cli');
if (process.env.NODE_ENV != 'test') cli.init(router);

/**
 * {
  'actiontype-create': [AsyncFunction: create],
  'actiontype-find': [AsyncFunction: findByName],
  'resource-create': [AsyncFunction: create],
  'resource-remove': [AsyncFunction: remove],
  'resource-update': [AsyncFunction: update],
  'resource-find': [AsyncFunction: findByName],
  'role-create': [AsyncFunction: findByName],
  'role-can': [AsyncFunction: can],
  'user-create': [AsyncFunction: create],
  'user-update': [AsyncFunction: update],
  'user-remove': undefined,
  'user-add-role': [AsyncFunction: addRole],
  'user-rm-role': [AsyncFunction: removeRole],
  'user-can': [AsyncFunction: can],
  'permission-for-resource': [AsyncFunction: findByResource],
  'rp-grant': [AsyncFunction: grant],
  'rp-revoke': [AsyncFunction: revoke],
  'rp-for-role': [AsyncFunction: findByRole],
  'rp-for-resource': [AsyncFunction: findByResource]
}
 */


/**
 * 1. Add Roles
 * 2. Add Resources and generate permissions for all resources
 * 3. Add Permissions to roles
 * 4. create user
 * 5. add roles to user
*/

dryRun = () => {
    const flow = [
        ['role-create', { name: 'admin' }],
        ['role-create', { name: 'agent' }],
        ['resource-create', { name: 'order' }],
        ['resource-create', { name: 'payment' }],
        ['permission-for-resource', { resource: 'payment' }],
        ['permission-for-resource', { resource: 'order' }],
        ['role-can', { resource: 'order', role: 'admin', actionType: 'create' }],
        ['rp-grant', { resource: 'order', role: 'admin', actionType: 'create' }],
        ['role-can', { resource: 'order', role: 'admin', actionType: 'create' }],
        ['rp-grant', { resource: 'payment', role: 'agent', actionType: 'read' }],
        ['role-can', { resource: 'payment', role: 'agent', actionType: 'read' }],
        ['rp-revoke', { resource: 'order', role: 'admin', actionType: 'create' }],
        ['role-can', { resource: 'order', role: 'admin', actionType: 'create' }],
        ['user-create', { name: 'raghava' }],
        ['user-add-role', { role: 'admin', name: 'raghava' }],
        ['user-can', { resource: 'payment', name: 'raghava', actionType: 'read' }],
        ['user-add-role', { role: 'agent', name: 'raghava' }],
        ['user-can', { resource: 'payment', name: 'raghava', actionType: 'read' }],
        ['resource-remove', { name: 'payment' }],
        ['user-can', { resource: 'payment', name: 'raghava', actionType: 'read' }],
        ['user-rm-role', { role: 'admin', name: 'raghava' }],
        ['rp-for-role', { role: 'admin' }],
        ['rp-for-resource', { resource: 'order' }],
    ]

    const resp = [];
    flow.reduce(async (p, f, i) => {
        try {
            await p;
            await Promise.delay(100);
            const res = await router.forward(f[0], f[1]);
            // console.log(`${i} - ${typeof res === 'object' ? JSON.stringify(res) : res}`);
            resp.push(typeof res === 'object' ? JSON.stringify(res) : res);
            if (i === 22) console.log(resp);
        } catch (error) {
            resp.push(error.message);
        }
    }, true)
    return resp;
}