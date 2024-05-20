'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/app/login/auth';
import { AuthError } from 'next-auth';
import { fetchOrdersCount } from '@/scripts/fetch/fetchOrders';
import { fetchUserInfo } from '@/scripts/fetch/fetchUserInfo';

const FormSchema = z.object({
  retailer: z.string(),
  shipper: z.string(),
  wholesaler: z.string(),
  pallet: z.array(z.array((z.string(), z.number()))),
  skus_left: z.string(),
  packager: z.string(),
});

const CreateOrder = FormSchema.omit({wholesaler: true, pallet: true, packager: true})
const UpdateOrder = FormSchema

export type State = {
  errors?: {}
  message?: string | null;
};


export async function createOrder(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateOrder.safeParse({
    retailer: formData.get('retailer'),
    shipper: formData.get('shipper'),
    skus_left: formData.get('skus_left'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Order.',
    };
  }

  // Prepare data for insertion into the database
  const { retailer, shipper, skus_left } = validatedFields.data;
  const user = await auth();
  const userinfo = await fetchUserInfo(user?.user?.email || "");
  const wholesaler = userinfo?.wholesaler || "";

  const formattedRetailer = retailer.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const order_number = formattedRetailer + '-' + (await fetchOrdersCount(wholesaler, formattedRetailer) + 1).toString().padStart(3, '0');
  const pallets = JSON.stringify([]);
  const packager = "";
  const newskus_left = JSON.stringify(skus_left);

  // Insert data into the database
  try {
    await sql`
      INSERT INTO retailreadyorders (order_number, retailer, shipper, wholesaler, pallets, skus_left, packager, time_elapsed)
      VALUES (${order_number}, ${retailer}, ${shipper}, ${wholesaler}, ${pallets}, ${newskus_left}, ${packager}, ${0})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Order.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/assemble');
  redirect('/assemble');
}

export async function deleteOrder(unique_id: string) {  
  console.log("deleteOrder", unique_id)
  try {
      await sql`DELETE FROM retailreadyorders WHERE unique_id = ${unique_id}`;
      revalidatePath('/assemble');
      console.log("TEST", unique_id)

      return { message: 'Deleted Order' };
  } catch (error) {
      console.log(error)
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }

//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;

//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }

//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   // throw new Error('Failed to Delete Invoice');

//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice.' };
//   }
// }

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }