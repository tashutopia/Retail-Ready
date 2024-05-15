import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("AUTH.CONFIG.TS BAHHHHH")
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname.startsWith('/home');
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("AUTH.CONFIG.TS AHHHHHH")
        return Response.redirect(new URL('/home', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

// export const authorized = ({ auth, request: { nextUrl } }: { auth: any, request: { nextUrl: any } }) => {
//   console.log("AUTH.CONFIG.TS BAHHHHH")
//   const isLoggedIn = !!auth?.user;
//   const isOnHome = nextUrl.pathname.startsWith('/home');
//   if (isOnHome) {
//     if (isLoggedIn) return true;
//     return false; // Redirect unauthenticated users to login page
//   } else if (isLoggedIn) {
//     console.log("AUTH.CONFIG.TS AHHHHHH")
//     return Response.redirect(new URL('/home', nextUrl));
//   }
//   return true;
// }