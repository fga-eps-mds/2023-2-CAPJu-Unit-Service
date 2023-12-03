
const routesPermissions = [
    {
        parentPath: '',
        childRoutes: [
            /*
            This route, used on the sign-up screen, should be made public.
             { path: '/', permissions: 'see-unit', method: 'GET' }
            */
            { path: '/newUnit', permissions: 'create-unit', method: 'POST' },
            { path: '/updateUnit', permissions: 'edit-unit', method: 'PUT' },
            { path: '/deleteUnit', permissions: 'delete-unit', method: 'DELETE' },
        ]
    },
];

export default routesPermissions;

