/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";


export const createPost = async (formData: FormData): Promise<any> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value; 
    console.log("accessToken:", token);
  
    if (!token) {
      console.error("Authentication token is missing");
      return { success: false, error: "Authentication token is missing" };
    }
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/post/create-post`,
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
      console.error("Error in create post:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };

export const getAllpost = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
