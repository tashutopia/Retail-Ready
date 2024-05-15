// unique id is the email

const users = [
    {
        name: 'Wholesaler 1 Worker',
        email: 'worker@wholesaler1.com',
        password: 'password',
        type: 'worker',
        wholesaler: 'Wholesaler 1',
    },
    {
        name: 'Wholesaler 1 Admin',
        email: 'admin@wholesaler1.com',
        password: 'password',
        type: 'admin',
        wholesaler: 'Wholesaler 1',
    },
    {
        name: 'Wholesaler 2 Worker',
        email: 'worker@wholesaler2.com',
        password: 'password',
        type: 'worker',
        wholesaler: 'Wholesaler 2',
    },
    {
        name: 'Wholesaler 2 Admin',
        email: 'admin@wholesaler2.com',
        password: 'password',
        type: 'admin',
        wholesaler: 'Wholesaler 2',
    },
];

module.exports = { users };