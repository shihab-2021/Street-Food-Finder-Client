// import { NextRequest, NextResponse } from "next/server";
// import { getCurrentUser } from "./service/Auth";

// type Role = keyof typeof roleBasedPrivateRoutes;

// const authRoutes = ["/login", "/register"];

// const roleBasedPrivateRoutes = {
//   user: [
//     "/customer",
//     "/dashboard/customer/profile",
//     "/subscription",
//     "/addtaste",
//   ],
//   admin: [
//     "/dashboard",
//     "/dashboard/admin/addCategory",
//     "/dashboard/admin/manageAllPosts",
//     "/dashboard/admin/manageApprovedPosts",
//     "/dashboard/admin/managePendingPosts",
//     "/dashboard/admin/managePremiumPosts",
//     "/dashboard/admin/manageRejectedPost",
//   ],
// };

// export const middleware = async (request: NextRequest) => {
//   const { pathname } = request.nextUrl;

//   const userInfo = await getCurrentUser();
//   console.log("userInfo => ", userInfo);

//   if (!userInfo) {
//     if (authRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(
//           `http://localhost:3000/login?redirectPath=${pathname}`,
//           request.url
//         )
//       );
//     }
//   }

//   const role = (userInfo.role as string).toLowerCase() as Role;

//   if (userInfo?.role && roleBasedPrivateRoutes[role]) {
//     const routes = roleBasedPrivateRoutes[role];
//     console.log("routes => ", routes);
//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// };

// export const config = {
//   matcher: [
//     "/subscription",
//     "/addtaste",
//     "/tastes",
//     "/proPosts",
//     "/dashboard/:path*",
//   ],
// };

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getCurrentUser } from "./service/Auth";

// const AuthRoutes = ["/login", "/signup"];
// const PublicAuthenticatedRoutes = [
//   "/subscription",
//   "/addtaste",
//   "/tastes",
//   // "/postDetails",
//   // "/proPosts",
// ];

// type Role = keyof typeof roleBasedRoutes;

// const roleBasedRoutes = {
//   ADMIN: [/^\/dashboard\/admin/],
//   USER: [/^\/dashboard\/customer/],
// };

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   let user;
//   try {
//     user = await getCurrentUser();
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     user = null;
//   }

//   // Allow access to login and signup without auth
//   if (!user) {
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${encodeURIComponent(pathname)}`, request.url)
//       );
//     }
//   }

//   // ✅ Allow authenticated users to visit general authenticated routes
//   if (PublicAuthenticatedRoutes.includes(pathname)) {
//     return NextResponse.next();
//   }

//   // ⭐ Check premium access for /proPosts
//   if (pathname === "/proPosts") {
//     console.log("user => ", user);
//     if (user?.isPremium) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(new URL("/subscription", request.url));
//     }
//   }

//   // 🔐 Role-based route enforcement
//   if (user?.role && roleBasedRoutes[user?.role as Role]) {
//     const allowedRoutes = roleBasedRoutes[user?.role as Role];
//     if (allowedRoutes.some((route) => route.test(pathname))) {
//       return NextResponse.next();
//     }
//   }

//   // ❌ Unauthorized access fallback
//   return NextResponse.redirect(new URL("/", request.url));
// }

// export const config = {
//   matcher: [
//     "/subscription",
//     "/addtaste",
//     "/tastes",
//     "/proPosts",
//     // "/postDetails/:path*",
//     "/dashboard/customer/:path*",
//     "/dashboard/admin/:path*",
//     "/login",
//     "/signup",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/Auth"; // Make sure this function extracts user from cookie/token

// Routes that do not require authentication
const AuthRoutes = ["/login", "/signup"];

// Routes that are accessible only if user is logged in (any role)
const PublicAuthenticatedRoutes = [
  "/subscription",
  "/addtaste",
  "/tastes",
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
    "/tastes",
    "/proPosts",
    "/postDetails/:path*",
    "/dashboard/customer/:path*",
    "/dashboard/admin/:path*",
    "/login",
    "/signup",
  ],
};
