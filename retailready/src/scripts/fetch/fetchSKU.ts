import { sql } from '@vercel/postgres';
import { Order, User } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchSKU(orderNumber: string, wholesaler: string) {
    noStore();

    try {
        const order = await sql<Order>`SELECT * FROM retailreadyorders WHERE order_number = ${orderNumber} AND wholesaler = ${wholesaler}`;
        return order.rows[0].skus_left;
    } catch (error) {
        console.error('Failed to fetch skus from order:', error);
    }
}

export async function fetchAllSKUs() {
    noStore();

    try {
        const skus = await sql<Screen>`SELECT skus FROM retailreadyscreens`;
        return skus.rows;
    } catch (error) {
        console.error('Failed to fetch skus from order:', error);
    }
}