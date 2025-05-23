import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/Auth"; // Make sure this function extracts user from cookie/token

// Routes that do not require authentication
const AuthRoutes = ["/login", "/signup"];

// Routes that are accessible only if user is logged in (any role)
const PublicAuthenticatedRoutes = [
  "/subscription",
  "/addtaste",
  // "/tastes",
  "/postDetails",
];

// Routes that require premium users
const PremiumOnlyRoutes = ["/proPosts"];

// Role-based restricted routes
const roleBasedRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  USER: [/^\/dashboard\/customer/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Attempt to get the user from token/cookie
  let user = null;
  try {
    user = await getCurrentUser(); // Make sure this reads cookie or header token
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  // 2. If no user and not accessing public auth routes -> redirect to login
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  // 3. Allow access to public authenticated routes
  const isPublicAuthenticated = PublicAuthenticatedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isPublicAuthenticated) {
    return NextResponse.next();
  }

  // 4. Handle premium-only route
  const isPremiumOnly = PremiumOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );
  if (isPremiumOnly) {
    if (user.isPremium) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/subscription", request.url));
    }
  }

  // 5. Handle role-based routes
  const userRole = user.role as Role;
  const allowedRoutes = roleBasedRoutes[userRole];
  if (allowedRoutes && allowedRoutes.some((regex) => regex.test(pathname))) {
    return NextResponse.next();
  }

  // 6. Block access and redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// 7. Configure route matching
export const config = {
  matcher: [
    "/subscription",
    "/addtaste",
    // "/tastes",
    "/proPosts",
    // "/postDetails/:path*",
    "/dashboard/customer/:path*",
    "/dashboard/admin/:path*",
    "/login",
    "/signup",
  ],
};
