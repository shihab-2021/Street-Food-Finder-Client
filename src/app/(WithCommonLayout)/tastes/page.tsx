import TastePage from "@/components/modules/Taste/TastePage";
import React, { Suspense } from "react";

export default function Tastes() {
  return (
    <div>
      <Suspense>
        <TastePage />
      </Suspense>
    </div>
  );
}
