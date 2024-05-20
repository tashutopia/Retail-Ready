const { orders } = require('../seed-data/orders');

async function seedOrders(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      const createTable = await client.sql`
      DROP TABLE IF EXISTS retailreadyorders;
      CREATE TABLE IF NOT EXISTS retailreadyorders (
          unique_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
          order_number VARCHAR(255) NOT NULL,
          retailer TEXT NOT NULL,
          shipper TEXT NOT NULL,
          wholesaler VARCHAR(255) NOT NULL,
          pallets JSON NOT NULL,
          skus_left JSON NOT NULL,
          packager TEXT NOT NULL,
          time_elapsed INTEGER NOT NULL
        );
      `;
  
      console.log(`Created "retailreadyorders" table`);
  
      const insertedOrders = await Promise.all(
        orders.map(async (order) => {
            return client.sql`
            INSERT INTO retailreadyorders (order_number, retailer, shipper, wholesaler, pallets, skus_left, packager, time_elapsed) 
            VALUES (${order.order_number}, ${order.retailer}, ${order.shipper}, ${order.wholesaler}, ${JSON.stringify(order.pallets)}, ${JSON.stringify(order.skus_left)}, ${order.packager}, ${order.time_elapsed}) 
            ON CONFLICT (unique_id) DO UPDATE SET order_number = EXCLUDED.order_number, retailer = EXCLUDED.retailer, shipper = EXCLUDED.shipper, wholesaler = EXCLUDED.wholesaler, pallets = EXCLUDED.pallets, skus_left = EXCLUDED.skus_left, packager = EXCLUDED.packager, time_elapsed = EXCLUDED.time_elapsed; 
        `;
        }),
      );
  
      console.log(`Seeded ${insertedOrders.length} orders`);
  
      return {
        createTable,
        orders: insertedOrders,
      };
    } catch (error) {
      console.error('Error seeding orders:', error);
      throw error;
    }
}

module.exports = seedOrders;