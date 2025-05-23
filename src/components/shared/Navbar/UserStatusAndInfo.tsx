"use client";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  LayoutDashboardIcon,
  LogIn,
  LogOutIcon,
  UserCircle2Icon,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function UserStatusAndInfo() {
  const token = useAppSelector(useCurrentToken);
  const [profile, setProfile] = useState<any>({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

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
    <>
      <div className="hidden md:flex items-center space-x-8">
        {token && (
          <Link
            href={`/addtaste`}
            className="flex items-center space-x-1 text-gray-100 hover:text-amber-600 transition-colors duration-200"
          >
            <span>Add Taste</span>
          </Link>
        )}
        {profile?.data?.isPremium && (
          <Link
            href={`/proPosts`}
            className="flex items-center space-x-1 text-gray-100 hover:text-amber-600 transition-colors duration-200"
          >
            <span>Pro Posts</span>
          </Link>
        )}
      </div>
      {token ? (
        <div className="relative">
          <button
            onClick={() => toggleProfile()}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer"
          >
            {profile?.data?.profilePhoto ? (
              <Image
                src={profile?.data?.profilePhoto}
                // profile?.data?.name
                alt="image"
                className="h-10 w-10 rounded-full object-cover border"
                width={50}
                height={50}
              />
            ) : (
              <UserCircle2Icon className="h-10 w-10 text-gray-100" />
            )}
            <span className="text-gray-50">{profile?.data?.name}</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                href={
                  profile?.data?.role === "ADMIN"
                    ? "/dashboard/admin"
                    : "/dashboard/customer/profile"
                }
                className="flex items-center gap-1 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 gap-1"
              >
                <LogOutIcon className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="flex items-center space-x-1 text-gray-100 hover:text-amber-600"
          >
            <LogIn />
            <span>Login</span>
          </Link>
          <Link
            href="/register"
            className="flex items-center space-x-1 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            <UserPlus />
            <span>Register</span>
          </Link>
        </div>
      )}
    </>
  );
}
