import AdminAllPostControl from "@/components/modules/Dashboard/Admin/AdminAllPostControl";
import React from "react";

export default function ManageAllPosts() {
  return (
    <div>
      <AdminAllPostControl
        posts={[
          {
            id: "123-asdf-asdfasd-asdfasd",
            title: "Best Chaat Place",
            location: "Mumbai",
            priceRange: "$100 - $200",
            // description: "Some description",
            isPremium: false,
          },
          {
            id: "124-sadfasdf-asdf-sdfsdf-sdf",
            title: "Best Chaat Place",
            location: "Mumbai",
            priceRange: "$100 - $200",
            // description: "Some description",
            isPremium: false,
          },
        ]}
      />
    </div>
  );
}
