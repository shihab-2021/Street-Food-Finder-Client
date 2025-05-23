"use client";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { toggleState } from "@/redux/features/device/deviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { LayoutDashboardIcon, LogIn, LogOut, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavItem {
  name: string;
  path: string;
  //   icon: React.ElementType;
}

export default function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const isOpen = useAppSelector((state) => state.isOpen.value);
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const [profile, setProfile] = useState<any>({});
  const router = useRouter();

  const getCurrentProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
      // return data?.data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

  useEffect(() => {
    getCurrentProfile();
  }, [token]);
  return (
    <div
      className={`lg:hidden transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      } fixed top-16 left-0 right-0 z-50`}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-lg p-4">
        <div className="space-y-3">
          <div className="space-y-3 block md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 
                    transition-colors duration-200 group px-4 py-2 rounded-md
                    hover:bg-blue-50/50"
                onClick={() => dispatch(toggleState())}
              >
                {/* <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" /> */}
                <span>{item.name}</span>
              </Link>
            ))}
            {token && (
              <>
                <Link
                  href={
                    profile?.data?.role === "ADMIN"
                      ? "/dashboard/admin"
                      : "/dashboard/customer/profile"
                  }
                  className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                  onClick={() => dispatch(toggleState())}
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </div>
          <hr className="border-gray-200 block md:hidden" />
          <div className="space-y-3 pt-2 md:pt-0">
            {!token && (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                  onClick={() => dispatch(toggleState())}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-2 text-blue-600  px-4 py-2"
                  onClick={() => dispatch(toggleState())}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
            {token && (
              <button
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
                className="flex items-center space-x-2 text-gray-600 px-4 py-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
