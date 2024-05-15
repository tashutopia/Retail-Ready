import { signIn } from "./auth";
import { AuthError } from 'next-auth';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const response = await signIn('credentials', formData);
        if (response) {
            console.log("RESPONSE AHDHASDIOFHASJKDF")
            window.location.href = '/home';
        } else {
            console.log(response)
            window.location.href = '/home';
        }
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