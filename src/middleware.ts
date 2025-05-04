import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./service/Auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  customer: [/^\/customer(\/|$)/, /^\/profile/],
  admin: [/^\/dashboard(\/|$)/, /^\/profile/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/subscription",
    "/dashboard/admin/addCategory",
    "/dashboard/admin/manageAllPosts",
    "/dashboard/admin/manageApprovedPosts",
    "/dashboard/admin/managePendingPosts",
    "/dashboard/admin/managePremiumPosts",
    "/dashboard/admin/manageRejectedPost",
    "/customer/profile",
    "/dashboard/:path*",
    "/customer/:path*",
  ],
};
