/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deletePosts } from "@/service/Posts";

interface Post {
  id: string;
  title: string;
  location: string;
  priceRange: string;
  isPremium: boolean;
  image?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface ManagePostsProps {
  posts: Post[];
}

const AdminAllPostControl: React.FC<ManagePostsProps> = ({ posts }) => {
  const [allPosts, setAllPosts] = useState<Post[]>(posts);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleTogglePremium = async (postId: string, isPremium: boolean) => {};

  const handleDelete = async (postId: string) => {
    try {
      setLoadingId(postId);
      await deletePosts(postId);
      setAllPosts((prev) => prev.filter((post) => post.id !== postId));
      setSelectedPostId(null);
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Delete failed.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage All Posts</h1>

      {allPosts?.length === 0 ? (
        <p className="text-gray-600">No posts available.</p>
      ) : (
        <div className="grid gap-6">
          {allPosts?.map((post) => (
            <div
              key={post.id}
              className="bg-white border rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
            >
              <div className="w-full sm:w-40 h-40 relative">
                <Image
                  src={post.image || "/assets/joinUs.png"}
                  alt={post.title}
                  fill
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold flex justify-between">
                  <span>{post.title}</span>
                  <button
                    disabled
                    className="bg-green-600 text-white text-sm px-3 py-1 rounded "
                  >
                    {post.status}
                  </button>
                </h2>
                <p className="text-sm text-gray-600 mt-1">{post.location}</p>
                <p className="text-sm text-gray-500 mb-2">
                  💰 {post.priceRange}
                </p>

                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  {/* <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button> */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={() => setSelectedPostId(post.id)}
                        className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (selectedPostId) handleDelete(selectedPostId);
                          }}
                          disabled={loadingId === selectedPostId}
                        >
                          {loadingId === selectedPostId
                            ? "Deleting..."
                            : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllPostControl;
