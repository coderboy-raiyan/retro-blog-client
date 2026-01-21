import { NextRequest, NextResponse } from "next/server";
import { Role } from "./constants/roles";
import { userService } from "./services/user/user.service";

export async function proxy(req: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  const pathname = req.nextUrl.pathname;
  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data?.user?.role === Role.admin;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
