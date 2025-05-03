/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updatePostStatus } from "@/service/Posts";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  location: string;
  image?: string;
  isPremium: boolean;
}

interface PendingPostsProps {
  posts: Post[];
}

const AdminRejectedPostControl: React.FC<PendingPostsProps> = ({ posts }) => {
  const [allPosts, setAllPosts] = useState<Post[]>(posts);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (
    id: string,
    updates: { status?: "APPROVED"; isPremium?: boolean }
  ) => {
    try {
      setLoadingId(id);
      if (updates.status) {
        const result = await updatePostStatus(id, updates.status);

        if (result.success) {
          toast.success(`Post ${updates.status.toLowerCase()} successfully!`);

          setAllPosts((prev) => prev.filter((post) => post.id !== id));
        } else {
          toast.error("Failed to update status");
        }
      } else if (typeof updates.isPremium === "boolean") {
        toast.success(
          `Post marked as ${updates.isPremium ? "Premium" : "Regular"}`
        );
        setAllPosts((prev) =>
          prev.map((post) =>
            post.id === id ? { ...post, isPremium: updates.isPremium! } : post
          )
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Review Rejected Posts
      </h1>

      {allPosts.length === 0 ? (
        <p className="text-gray-600">No Rejected Posts.</p>
      ) : (
        <div className="grid gap-6">
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-40 h-40 relative flex-shrink-0">
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
                  <button
                    onClick={() =>
                      handleAction(post.id, { status: "APPROVED" })
                    }
                    className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Approve
                  </button>
                  {/* <button
                    onClick={() =>
                      handleAction(post.id, { status: "REJECTED" })
                    }
                    className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Reject
                  </button> */}
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={post.isPremium}
                      onChange={() =>
                        handleAction(post.id, { isPremium: !post.isPremium })
                      }
                      className="accent-orange-500"
                    />
                    <span className="text-sm">Mark as Premium</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRejectedPostControl;
