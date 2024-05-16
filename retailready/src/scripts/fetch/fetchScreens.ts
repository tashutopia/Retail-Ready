import { sql } from '@vercel/postgres';
import { Screen, Sequence, User, Order } from '@/scripts/definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { REACT_LOADABLE_MANIFEST } from 'next/dist/shared/lib/constants';

export async function fetchScreens (sku: string, orderNumber: string, email: string) {
    noStore();
    
    try {
        const user = await sql<User>`SELECT * FROM retailreadyusers WHERE email = ${email}`;
        const wholesaler = user.rows[0].wholesaler;

        const order = await sql<Order>`SELECT * FROM retailreadyorders WHERE order_number = ${orderNumber} AND wholesaler = ${wholesaler}`;
        const retailer = order.rows[0].retailer;

        const screens = await sql<Screen>`SELECT * FROM retailreadyscreens WHERE ${sku} = ANY(skus) AND retailer = ${retailer}`;
        
        const sequence = await sql<Sequence>`SELECT * FROM retailreadysequences WHERE retailer = ${retailer} AND wholesaler = ${wholesaler} AND category = ${screens.rows[0].category}`;
        
        // console.log(screens.rows[0].screens, sequence.rows[0].screens)
        return [screens.rows[0].screens, sequence.rows[0].screens];
    } catch (error) {
        console.error('Failed to fetch screens:', error);
    }
}

