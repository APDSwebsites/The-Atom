import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const isAuthenticated = await auth();
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdminPage && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
