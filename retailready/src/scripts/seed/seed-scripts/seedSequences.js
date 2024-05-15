const { sequences } = require('../seed-data/sequences');

async function seedSequences(client) {
    try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
      DROP TABLE IF EXISTS retailreadysequences;
      CREATE TABLE IF NOT EXISTS retailreadysequences (
          unique_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
          retailer TEXT NOT NULL,
          wholeseller VARCHAR(255) NOT NULL,
          category VARCHAR(255) NOT NULL,
          screens integer[] NOT NULL
        );
      `;
  
      console.log(`Created "retailreadysequences" table`);
  
      const insertedSequences = await Promise.all(
        sequences.map(async (sequence) => {
            return client.sql`
            INSERT INTO retailreadysequences (retailer, wholeseller, category, screens)
            VALUES (${sequence.retailer}, ${sequence.wholeseller}, ${sequence.category}, ${sequence.screens})
            ON CONFLICT (unique_id) DO UPDATE SET retailer = EXCLUDED.retailer, wholeseller = EXCLUDED.wholeseller, category = EXCLUDED.category, screens = EXCLUDED.screens;
        `;
        }),
      );
  
      console.log(`Seeded ${insertedSequences.length} orders`);
  
      return {
        createTable,
        sequences: insertedSequences,
      };``
    } catch (error) {
      console.error('Error seeding sequences:', error);
      throw error;
    }
}

module.exports = seedSequences;

