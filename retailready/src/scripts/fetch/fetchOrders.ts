import { sql } from '@vercel/postgres';
import { Order, User } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOrders(email: string) {
    noStore();
    
    try {
        const user = await sql<User>`SELECT * FROM retailreadyusers WHERE email = ${email}`;
        const wholesaler = user.rows[0].wholesaler;

        try {
            const data = await sql<Order>`SELECT * FROM retailreadyorders WHERE wholesaler = ${wholesaler}`;
            return data.rows;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    } catch (error) {
        console.error('Failed to fetch wholesaler from user:', error);
    }
}

