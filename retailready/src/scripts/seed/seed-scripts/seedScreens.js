const { screens } = require('../seed-data/screens');

async function seedScreens(client) {
    try {
      const createTable = await client.sql`
        DROP TABLE IF EXISTS retailreadyscreens;
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

module.exports = seedScreens;

