const router = require('../src/controllers/index');
router.load();
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('RBAC Flow', () => {
    describe('All user flows - executed with sample payload', () => {
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
        ];
        const expectedResponse = [
            '{"id":1,"name":"admin"}',
            '{"id":2,"name":"agent"}',
            '{"id":1,"name":"order"}',
            '{"id":2,"name":"payment"}',
            '[{"id":5,"resourceId":2,"actionTypeId":1},{"id":6,"resourceId":2,"actionTypeId":2},{"id":7,"resourceId":2,"actionTypeId":3},{"id":8,"resourceId":2,"actionTypeId":4}]',
            '[{"id":1,"resourceId":1,"actionTypeId":1},{"id":2,"resourceId":1,"actionTypeId":2},{"id":3,"resourceId":1,"actionTypeId":3},{"id":4,"resourceId":1,"actionTypeId":4}]',
            false,
            '{"id":1,"roleId":1,"permissionId":1}',
            true,
            '{"id":2,"roleId":2,"permissionId":6}',
            true,
            true,
            false,
            '{"id":1,"name":"raghava"}',
            '{"id":1,"userId":1,"roleId":1}',
            false,
            '{"id":2,"userId":1,"roleId":2}',
            true,
            true,
            'Resource not found by the name payment',
            true,
            '[]',
            '[]'
        ]
        const resp = [];
        it('The response for each call should match the expected response', async () => {
            await flow.reduce(async (p, f, i) => {
                try {
                    await p;
                    await wait(50);
                    const res = await router.forward(f[0], f[1]);
                    resp.push(typeof res === 'object' ? JSON.stringify(res) : res);
                    if (i === flow.length - 1) console.log(resp);
                } catch (error) {
                    resp.push(error.message);
                }
            }, true)
            expect(resp).toEqual(expectedResponse);
        })
    })
})
