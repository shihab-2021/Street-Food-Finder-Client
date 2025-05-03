import AdminApprovedPostControl from "@/components/modules/Dashboard/Admin/AdminApprovedPostControl";
import { getApprovedpost } from "@/service/Posts";
import React from "react";

export default async function ManageApprovedPosts() {
  const data = await getApprovedpost();
  return (
    <div>
      <AdminApprovedPostControl posts={data.data} />
    </div>
  );
}
