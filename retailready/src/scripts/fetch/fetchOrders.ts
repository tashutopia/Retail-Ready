import { sql } from '@vercel/postgres';
import { Order, User } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';


const ITEMS_PER_PAGE = 6;

export async function fetchOrders(wholesaler: string, query: string, currentPage: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    
    try {
        const orders = await sql<Order>`
            SELECT * FROM retailreadyorders
            WHERE
                wholesaler = ${wholesaler} AND
                (order_number ILIKE ${`%${query}%`} OR
                shipper ILIKE ${`%${query}%`} OR
                retailer ILIKE ${`%${query}%`})
            LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;
        return orders.rows;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }
}

export async function fetchOrdersPages(wholesaler: string, query: string) {
    noStore();

    try {
        const count = await sql`SELECT COUNT(*)
            FROM retailreadyorders
            WHERE
                wholesaler = ${wholesaler} AND
                (order_number ILIKE ${`%${query}%`} OR
                shipper ILIKE ${`%${query}%`} OR
                retailer ILIKE ${`%${query}%`})
            `;
  
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total pages of orders.');
    }
  }

  export async function fetchOrdersCount(wholesaler: string, retailer: string) {
    noStore();

    try {
        const count = await sql`SELECT COUNT(*)
            FROM retailreadyorders
            WHERE
                wholesaler = ${wholesaler} AND
                retailer =  ${retailer}
            `;
  
        console.log("count.rows[0].count", count.rows[0].count);
        return Number(count.rows[0].count);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of orders.');
    }
  }