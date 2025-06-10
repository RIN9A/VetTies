import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (!token) {
        const loginUrl = new URL("/login", req.nextUrl.origin);
        loginUrl.searchParams.set("error", "session_expired");
        return Response.redirect(loginUrl);
      }
      return true;
    },
  },
});

export const config = { matcher: ["/dashboard/:path*"] };