/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  makeStatusPremium,
  makeStatusRegular,
  updatePostStatus,
} from "@/service/Posts";
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

const AdminPremiumPostControl: React.FC<PendingPostsProps> = ({ posts }) => {
  const [allPosts, setAllPosts] = useState<Post[]>(posts);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string) => {};

  const handleToggleRegular = async (postId: string, status: boolean) => {
    try {
      setLoadingId(postId);
      await makeStatusRegular(postId, status);
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, isPremium: !status } : post
        )
      );
    } catch (error) {
      console.error("Failed to update premium status", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Review Approved Posts
      </h1>

      {allPosts?.length === 0 ? (
        <p className="text-gray-600">No Approved Posts.</p>
      ) : (
        <div className="grid gap-6">
          {allPosts?.map((post) => (
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
                  {/* <button
                    onClick={() =>
                      handleAction(post.id, { status: "REJECTED" })
                    }
                    className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Reject
                  </button> */}
                  <button
                    onClick={() => handleAction(post.id)}
                    className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={post.isPremium}
                      onChange={() =>
                        handleToggleRegular(post.id, !post.isPremium)
                      }
                      className="accent-orange-500"
                      disabled={loadingId === post.id}
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

export default AdminPremiumPostControl;
