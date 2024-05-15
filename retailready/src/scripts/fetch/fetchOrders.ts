import { sql } from '@vercel/postgres';
import { Order } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOrders(wholesaler: string) {
    noStore();
    
    try {
        const data = await sql<Order>`SELECT * FROM retailreadyorders WHERE wholesaler = ${wholesaler}`;
        return data.rows;
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }
}

