import AdminPendingPostControl from "@/components/modules/Dashboard/Admin/AdminPendingPostControl";
import React from "react";

export default function ManagePosts() {
  return (
    <div>
      <AdminPendingPostControl
        posts={[
          {
            id: "123-asdf-asdfasd-asdfasd",
            title: "Best Chaat Place",
            location: "Mumbai",
            priceRange: "$100 - $200",
            description: "Some description",
            isPremium: false,
          },
          {
            id: "124-sadfasdf-asdf-sdfsdf-sdf",
            title: "Best Chaat Place",
            location: "Mumbai",
            priceRange: "$100 - $200",
            description: "Some description",
            isPremium: false,
          },
        ]}
      />
    </div>
  );
}
