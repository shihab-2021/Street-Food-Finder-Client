/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getMyProfile = async (): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.error("Authentication token is missing");
    return { success: false, error: "Authentication token is missing" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result.error || "Failed to fetch profile data",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
