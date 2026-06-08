import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");

  const protectedRoutes = [
    "/dashboard",
    "/interns",
    "/tasks",
    "/attendance",
    "/reports",
    "/intern-dashboard",
    "/my-tasks",
    "/my-attendance",
    "/my-profile",
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/interns/:path*",
    "/tasks/:path*",
    "/attendance/:path*",
    "/reports/:path*",
    "/intern-dashboard/:path*",
    "/my-tasks/:path*",
    "/my-attendance/:path*",
  ],
};