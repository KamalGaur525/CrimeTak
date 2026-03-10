import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {

    const isLoginPage = req.nextUrl.pathname === "/login";

    if (isLoginPage) {
      return NextResponse.next();
    }

  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};