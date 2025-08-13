import {withAuth} from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({token}) => {
        // Redirect unauthenticated users from /app routes to /login
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/app/:path*"],
};
