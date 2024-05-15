const { db } = require('@vercel/postgres');

const seedUsers = require('./seed-scripts/seedUsers');
const seedScreens = require('./seed-scripts/seedScreens');
const seedOrders = require('./seed-scripts/seedOrders');
const seedSequences = require('./seed-scripts/seedSequences');


async function main() {
    const client = await db.connect();

    try {
        await seedSequences(client);
    } catch (err) {
        console.error('An error occurred while attempting to seed the database:', err);
    } finally {
        await client.end();
    }
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
