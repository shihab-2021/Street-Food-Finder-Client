/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const createCategory = async (formData: FormData): Promise<any> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value; 
  
    if (!token) {
      console.error("Authentication token is missing");
      return { success: false, error: "Authentication token is missing" };
    }
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/category/create-category`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
  
      const result = await res.json();
      console.log("Server response:", result);
  
      if (!res.ok) {
        return {
          success: false,
          error: result.error || "Failed to create category",
        };
      }
  
      return result;
    } catch (error) {
      console.error("Error in createCategory:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

export const getAlLCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
