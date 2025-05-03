/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { FileEdit } from "lucide-react";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import TasteForm from "./EditPostModal";

const ClientCustomerProfile = ({ userPosts, profile }: { userPosts: any[]; profile: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const handleEditClick = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6 space-y-8">
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
                onClick={() => handleEditClick(post)}
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
                <h2 className="text-xl font-semibold">{post.title || "Untitled"}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {post.description || "..."}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                  📍 {post.location || "Unknown"} | 💰 {post.priceRange || "N/A"}
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
    </div>
  );
};

export default ClientCustomerProfile;