'use client';

import { auth, signIn } from "./auth";
import { AuthError } from 'next-auth';
// import { useRouter } from 'next/router';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
): Promise<string> {


    try {
        // const router = useRouter();
        await signIn('credentials', formData).then((response) => {
            // console.log("RESPONSE")
            // console.log(response);
            // router.push('/home'); // Redirect to the home page
        });
        
        const user = await auth();
        if (user) {
            console.log("USER", user);
            return 'signed in';
        }
        return 'not signed in';
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}
