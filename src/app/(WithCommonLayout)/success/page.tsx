/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Link from "next/link";

const PaymentSuccess = ({ searchParams }: any) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sansita p-6">
      <div className="text-6xl mb-4 text-[#FFB900]">✅</div>
      <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase. Your payment was processed successfully.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-[#FFB900] text-[#232536] rounded-md font-semibold hover:bg-yellow-400 transition"
      >
        Go to Home Page
      </Link>
    </div>
  );
};

export default PaymentSuccess;
