const bcrypt = require('bcrypt');

const { users } = require('../seed-data/users');

async function seedUsers(client) {
    try {
      const createTable = await client.sql`
        DROP TABLE IF EXISTS retailreadyusers;
        CREATE TABLE retailreadyusers (
          email TEXT PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          password TEXT NOT NULL,
          type VARCHAR(50) NOT NULL,
          wholesaler VARCHAR(50) NOT NULL
        );
      `;
  
      console.log(`Created "retailreadyusers" table`);
  
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO retailreadyusers (email, name, password, type, wholesaler)
          VALUES (${user.email}, ${user.name}, ${hashedPassword}, ${user.type}, ${user.wholesaler})
          ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password = EXCLUDED.password, type = EXCLUDED.type, wholesaler = EXCLUDED.wholesaler;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedUsers.length} users`);
  
      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
}

module.exports = seedUsers;

