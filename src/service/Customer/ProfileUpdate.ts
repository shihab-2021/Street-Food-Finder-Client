"use server";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateMyProfile = async (formData: FormData): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-my-profile`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
