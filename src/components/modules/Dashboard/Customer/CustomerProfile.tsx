/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/service/Customer";
import { getApprovedpost } from "@/service/Posts";
import { FileEdit } from "lucide-react";
import Image from "next/image";
import ProfileCard from "./ProfileCard";

const CustomerProfile = async () => {
  const data = await getMyProfile();
  const postsData = await getApprovedpost();

  const profile = data?.data;
  const posts = postsData?.data || [];

  const userPosts = posts.filter((post: any) => post.userId === profile?.id);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 space-y-8">
      <ProfileCard profile={profile} />

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
                // onClick={() => console.log("Edit", post.id)}
              >
                <FileEdit size={20} />
              </Button>

              <div className="w-full sm:w-40 h-20 relative flex-shrink-0">
                <Image
                  src={post.image || "/assets/joinUs.png"}
                  alt={post.title}
                  fill
                  className="rounded object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {post.description || "..."}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                  📍 {post.location} | 💰 {post.priceRange}
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
    </div>
  );
};

export default CustomerProfile;
