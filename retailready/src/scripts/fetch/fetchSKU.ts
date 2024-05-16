import { sql } from '@vercel/postgres';
import { Order, User } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchSKU(orderNumber: string, email: string) {
    noStore();
    
    try {
        const user = await sql<User>`SELECT * FROM retailreadyusers WHERE email = ${email}`;
        const wholesaler = user.rows[0].wholesaler;

        try {
            const order = await sql<Order>`SELECT * FROM retailreadyorders WHERE order_number = ${orderNumber} AND wholesaler = ${wholesaler}`;
            return order.rows[0].skus_left;
        } catch (error) {
            console.error('Failed to fetch skus from order:', error);
        }
        
    } catch (error) {
        console.error('Failed to fetch wholesaler from user:', error);
    }
}

