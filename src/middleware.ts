import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { redirect } from 'next/navigation';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // Redirect verified users from /verify to /rooms
    if (
      request.nextUrl.pathname === '/verify' &&
      request.nextauth.token?.isVerified
    ) {
      return NextResponse.redirect(new URL('/rooms', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to /verify for all authenticated users
        if (req.nextUrl.pathname === '/verify') {
          return !!token;
        }
        // Require verification for /rooms
        if (req.nextUrl.pathname.startsWith('/rooms')) {
          return !!token && token.isVerified === true;
        }
        // Allow access to all other routes
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/verify', '/rooms/', '/room/:path*'],
};
