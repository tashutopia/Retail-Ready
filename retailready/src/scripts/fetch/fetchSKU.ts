import { sql } from '@vercel/postgres';
import { Order } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchSKU(orderNumber: string) {
    noStore();
    
    try {
        const order = await sql<Order>`SELECT * FROM retailreadyorders WHERE order_number = ${orderNumber}`;
        return order.rows[0].skus_left;
    } catch (error) {
        console.error('Failed to fetch skus from order:', error);
    }
}

