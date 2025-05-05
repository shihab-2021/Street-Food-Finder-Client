import LoginPage from "@/components/modules/Login/Login";
import React, { Suspense } from "react";

export default function Login() {
  return (
    <div>
      <Suspense>
        <LoginPage />
      </Suspense>
    </div>
  );
}
