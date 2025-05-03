/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

// initiate payment
export const initiatePayment = async (
  amount: number,
  expiresIn: number
): Promise<any> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    console.error("Authentication token is missing");
    return { success: false, error: "Authentication token is missing" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ amount, expiresIn }),
      }
    );

    const result = await res.json();
    console.log("Payment Init Response:", result);

    if (!res.ok) {
      return {
        success: false,
        error: result.error || "Failed to initiate payment",
      };
    }

    return {
      success: true,
      paymentUrl: result.data.paymentUrl,
    };
  } catch (error: any) {
    console.error("Error in initiatePayment:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

// **/
// "use client";
// import { initiatePayment } from "@/server-actions/payment";

// const handleClick = async () => {
//   const res = await initiatePayment(500, 30);
//   if (res.success) {
//     window.location.href = res.paymentUrl;
//   } else {
//     alert(res.error);
//   }
// };

// **/

// validate payment
export const validatePayment = async (query: any): Promise<any> => {
  try {
    const searchParams = new URLSearchParams(query).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/ipn?${searchParams}`,
      {
        method: "POST",
      }
    );

    const result = await res.json();
    console.log("Validation response:", result);

    if (!res.ok) {
      return {
        success: false,
        error: result.error || "Payment validation failed",
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    console.error("Error in validatePayment:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
