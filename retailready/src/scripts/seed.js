const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');


const { orders } = require('./seed-data/orders');
const { screens } = require('./seed-data/screens');
const { users } = require('./seed-data/users');

async function seedUsers(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS retailreadyusers (
        email TEXT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        wholeseller VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "retailreadyusers" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO retailreadyusers (email, name, password, type, wholeseller)
        VALUES (${user.email}, ${user.name}, ${hashedPassword}, ${user.type}, ${user.wholeseller})
        ON CONFLICT (email) DO NOTHING;
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

async function seedScreens(client) {
    try {
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS retailreadyscreens (
          unique_id VARCHAR(255) PRIMARY KEY,
          retailer TEXT NOT NULL,
          category VARCHAR(255) NOT NULL,
          skus TEXT[] NOT NULL,
          screens JSON NOT NULL
        );
      `;
  
      console.log(`Created "retailreadyscreens" table`);
  
      const insertedScreens = await Promise.all(
        screens.map(async (screen) => {
            console.log(typeof(JSON.stringify(screen.screens)))
            return client.sql`
            INSERT INTO retailreadyscreens (unique_id, retailer, category, skus, screens)
            VALUES (${screen.unique_id}, ${screen.retailer}, ${screen.category}, ${screen.skus}, ${JSON.stringify(screen.screens)})
            ON CONFLICT (unique_id) DO UPDATE SET retailer = EXCLUDED.retailer, category = EXCLUDED.category, skus = EXCLUDED.skus, screens = EXCLUDED.screens;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedScreens.length} screens`);
  
      return {
        createTable,
        screens: insertedScreens,
      };
    } catch (error) {
      console.error('Error seeding screens:', error);
      throw error;
    }
}

async function seedOrders(client) {
    try {
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS retailreadyscreens (
          unique_id VARCHAR(255) PRIMARY KEY,
          retailer TEXT NOT NULL,
          category VARCHAR(255) NOT NULL,
          skus TEXT[] NOT NULL,
          screens JSON NOT NULL
        );
      `;
  
      console.log(`Created "retailreadyscreens" table`);
  
      const insertedScreens = await Promise.all(
        screens.map(async (screen) => {
            console.log(typeof(JSON.stringify(screen.screens)))
            return client.sql`
            INSERT INTO retailreadyscreens (unique_id, retailer, category, skus, screens)
            VALUES (${screen.unique_id}, ${screen.retailer}, ${screen.category}, ${screen.skus}, ${JSON.stringify(screen.screens)})
            ON CONFLICT (unique_id) DO UPDATE SET retailer = EXCLUDED.retailer, category = EXCLUDED.category, skus = EXCLUDED.skus, screens = EXCLUDED.screens;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedScreens.length} screens`);
  
      return {
        createTable,
        screens: insertedScreens,
      };
    } catch (error) {
      console.error('Error seeding screens:', error);
      throw error;
    }
}

async function main() {
    
    const client = await db.connect();

    try {
        await seedScreens(client);
        try {
            const fetchedScreens = await client.sql`
                SELECT * FROM retailreadyscreens;
            `;
            fetchedScreens.rows.forEach(screen => {
                console.log(`Fetched screen with ID: ${screen.unique_id} - Screens data: ${JSON.stringify(screen.screens)}`);
            });
        } catch (fetchError) {
            console.error('Error fetching screens:', fetchError);
        }
    } catch (err) {
        console.error('An error occurred while attempting to seed the database:', err);
    } finally {
        await client.end();  // Ensure the connection is always closed
    }
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
