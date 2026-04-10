import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login");

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }


  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
  ],
};