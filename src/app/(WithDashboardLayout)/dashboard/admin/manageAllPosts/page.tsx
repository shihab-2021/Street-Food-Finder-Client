import AdminAllPostControl from "@/components/modules/Dashboard/Admin/AdminAllPostControl";
import { getAllpost } from "@/service/Posts";
import React from "react";

export default async function ManageAllPosts() {
    const data = await getAllpost();
    console.log(data);
  return (
    <div>
      <AdminAllPostControl
       posts={data.data}
      />
    </div>
  );
}
