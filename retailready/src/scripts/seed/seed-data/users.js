// unique id is the email

const users = [
    {
        name: 'Wholeseller 1 Worker',
        email: 'worker@wholeseller1.com',
        password: 'password',
        type: 'worker',
        wholeseller: 'Wholeseller 1',
    },
    {
        name: 'Wholeseller 1 Admin',
        email: 'admin@wholeseller1.com',
        password: 'password',
        type: 'admin',
        wholeseller: 'Wholeseller 1',
    },
    {
        name: 'Wholeseller 2 Worker',
        email: 'worker@wholeseller2.com',
        password: 'password',
        type: 'worker',
        wholeseller: 'Wholeseller 2',
    },
    {
        name: 'Wholeseller 2 Admin',
        email: 'admin@wholeseller2.com',
        password: 'password',
        type: 'admin',
        wholeseller: 'Wholeseller 2',
    },
];

module.exports = { users };