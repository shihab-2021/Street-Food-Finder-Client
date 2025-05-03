import AdminPendingPostControl from "@/components/modules/Dashboard/Admin/AdminPendingPostControl";
import { getPendingpost } from "@/service/Posts";
import React from "react";

export default async function ManagePosts() {
  const data = await getPendingpost();
  return (
    <div>
      <AdminPendingPostControl
        // posts={[
        //   {
        //     id: "123-asdf-asdfasd-asdfasd",
        //     title: "Best Chaat Place",
        //     location: "Mumbai",
        //     priceRange: "$100 - $200",
        //     description: "Some description",
        //     isPremium: false,
        //   },
        //   {
        //     id: "124-sadfasdf-asdf-sdfsdf-sdf",
        //     title: "Best Chaat Place",
        //     location: "Mumbai",
        //     priceRange: "$100 - $200",
        //     description: "Some description",
        //     isPremium: false,
        //   },
        // ]}
        posts={data.data}
      />
    </div>
  );
}
