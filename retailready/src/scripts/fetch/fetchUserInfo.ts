import { sql } from '@vercel/postgres';
import { Order, User } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchUserInfo(email: string) {
    noStore();
    
    try {
        const user = await sql<User>`SELECT * FROM retailreadyusers WHERE email = ${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch wholesaler from user:', error);
    }
}

