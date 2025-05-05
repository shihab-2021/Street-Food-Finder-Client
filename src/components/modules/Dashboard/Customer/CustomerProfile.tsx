// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import { getMyProfile } from "@/service/Customer";
// import { getApprovedpost } from "@/service/Posts";
// import { FileEdit } from "lucide-react";
// import Image from "next/image";
// import ProfileCard from "./ProfileCard";

// const CustomerProfile = async () => {
//   const data = await getMyProfile();
//   const postsData = await getApprovedpost();

//   const profile = data?.data;
//   const posts = postsData?.data || [];

//   const userPosts = posts.filter((post: any) => post.userId === profile?.id);

//   return (
//     <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 space-y-8">
//       <ProfileCard profile={profile} />

//       <div className="max-w-2xl w-full space-y-4">
//         <h2 className="text-xl font-bold text-[#FFBC00] text-center">
//           My Posts
//         </h2>
//         {userPosts.length === 0 ? (
//           <p className="text-center text-gray-600">
//             You haven’t posted anything yet.
//           </p>
//         ) : (
//           userPosts.map((post: any) => (
//             <div
//               key={post.id}
//               className="bg-white border rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 relative"
//             >
//               <Button
//                 className="absolute top-2 right-2 text-[#FFBC00] hover:text-black transition"
//                 title="Edit Post"
//                 // onClick={() => console.log("Edit", post.id)}
//               >
//                 <FileEdit size={20} />
//               </Button>

//               <div className="w-full sm:w-40 h-20 relative flex-shrink-0">
//                 <Image
//                   src={post.image || "/assets/joinUs.png"}
//                   alt={post.title}
//                   fill
//                   className="rounded object-cover"
//                 />
//               </div>

//               <div className="flex-1">
//                 <h2 className="text-xl font-semibold">{post.title}</h2>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {post.description || "..."}
//                 </p>
//                 <p className="text-sm mt-2 text-gray-500">
//                   📍 {post.location} | 💰 {post.priceRange}
//                 </p>

//                 <div className="mt-4 flex flex-wrap gap-3 items-center">
//                   {post.isPremium && (
//                     <label className="inline-flex items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked
//                         readOnly
//                         className="accent-[#FFBC00]"
//                       />
//                       <span className="text-sm">Mark as Premium</span>
//                     </label>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomerProfile;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Mark as Client Component

import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/service/Customer";
import { getApprovedpost } from "@/service/Posts";
import { FileEdit, Loader2Icon } from "lucide-react";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import TasteForm from "./EditPostModal"; // Assuming this is the same as the TasteForm component
import Loading from "@/app/(WithCommonLayout)/success/loading";

const CustomerProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile and posts data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getMyProfile();
        const postsData = await getApprovedpost();

        const profile = profileData?.data;
        const posts = postsData?.data || [];

        // Filter posts by userId
        const filteredPosts = posts.filter(
          (post: any) => post.userId === profile?.id
        );

        setProfile(profile);
        setUserPosts(filteredPosts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 space-y-8">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader2Icon className="animate-spin h-20 w-20" />
        </div>
      ) : (
        <>
          {profile ? (
            <ProfileCard profile={profile} />
          ) : (
            <p className="text-center text-red-500">Failed to load profile</p>
          )}

          <div className="max-w-2xl w-full space-y-4">
            <h2 className="text-xl font-bold text-[#FFBC00] text-center">
              My Posts
            </h2>
            {userPosts.length === 0 ? (
              <p className="text-center text-gray-600">
                You haven’t posted anything yet.
              </p>
            ) : (
              userPosts.map((post: any) => (
                <div
                  key={post.id}
                  className="bg-white border rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 relative"
                >
                  <Button
                    className="absolute top-2 right-2 text-[#FFBC00] hover:text-black transition"
                    title="Edit Post"
                    onClick={() => handleEditClick(post)} // Trigger modal opening
                  >
                    <FileEdit size={20} />
                  </Button>

                  <div className="w-full sm:w-40 h-20 relative flex-shrink-0">
                    <Image
                      src={post.image || "/assets/joinUs.png"}
                      alt={post.title || "Post"}
                      fill
                      className="rounded object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                      {post.title || "Untitled"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {post.description || "..."}
                    </p>
                    <p className="text-sm mt-2 text-gray-500">
                      📍 {post.location || "Unknown"} | 💰{" "}
                      {post.priceRange || "N/A"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                      {post.isPremium && (
                        <label className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked
                            readOnly
                            className="accent-[#FFBC00]"
                          />
                          <span className="text-sm">Mark as Premium</span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal for editing post */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
              </DialogHeader>
              <TasteForm
                post={selectedPost}
                onClose={() => setIsModalOpen(false)}
                isEditMode={true}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CustomerProfile;
