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
          wholeseller VARCHAR(50) NOT NULL
        );
      `;
  
      console.log(`Created "retailreadyusers" table`);
  
      const insertedUsers = await Promise.all(
        users.map(async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          return client.sql`
          INSERT INTO retailreadyusers (email, name, password, type, wholeseller)
          VALUES (${user.email}, ${user.name}, ${hashedPassword}, ${user.type}, ${user.wholeseller})
          ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password = EXCLUDED.password, type = EXCLUDED.type, wholeseller = EXCLUDED.wholeseller;
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

