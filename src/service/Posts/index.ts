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

// Get All Posts
export const getAllpost = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get Pending Posts
export const getPendingpost = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/get-pending-post`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get Approved Post
export const getApprovedpost = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/get-approved-post`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get Rejected Post
export const getRejectedpost = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/get-rejected-post`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Update Post Status
export const updatePostStatus = async (
  postId: string,
  status: "APPROVED" | "REJECTED"
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/post/update-status/${postId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update post status");
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Post status update failed:", error.message);
    return { success: false, message: error.message };
  }
};
