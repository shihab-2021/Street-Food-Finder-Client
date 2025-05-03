"use client";

import { useAddCommentMutation } from "@/redux/features/comment/commentApi";
import { useGetSingleApprovedPostQuery } from "@/redux/features/post/postApi";
import { ThumbsDown, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostDetails({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const [comment, setComment] = useState("");
  const [postId, setPostId] = useState<string>("");
  const { data, refetch } = useGetSingleApprovedPostQuery(postId, {
    skip: !postId,
    refetchOnReconnect: true,
  });
  const [addComment, { isLoading }] = useAddCommentMutation();
  const post = data?.data;

  useEffect(() => {
    (async () => {
      const { postId } = await params;
      setPostId(postId);
    })();
  }, [params]);

  const handleCommentSubmit = async () => {
    const res = await addComment({ content: comment, postId: postId }).unwrap;
  };
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (!rating) return alert("Please give a rating.");

    setIsSubmitting(true);
    try {
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(rating);
  console.log(post);
  return (
    <div>
      {post && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 font-sansita">
          <div>
            <Image
              className="mx-auto"
              src={post?.image}
              alt="Post Image"
              width={500}
              height={500}
            />
          </div>
          {/* title info */}
          <div className="bg-amber-500 text-white p-2">
            <h1 className="text-2xl font-bold mb-1">
              {post.title}
              {post.isPremium && (
                <span className="p-1 text-xs bg-[#FFD700] mx-2 text-yellow-900 shadow-lg rounded">
                  PRO
                </span>
              )}
            </h1>
            <p>Price: {post.priceRange}</p>
            <div className="flex items-center justify-between">
              <div className="w-fit flex items-center gap-2 p-1 mt-1">
                <div
                  className="flex items-center gap-1 cursor-pointer hover:bg-amber-400 p-1 rounded
              "
                >
                  <ThumbsUpIcon />
                  <span className="text-sm">0</span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:bg-amber-400 p-1 rounded
              "
                >
                  <ThumbsDown />
                  <span className="text-sm">0</span>
                </div>
              </div>
              <div className="flex flex-col w-fit items-center">
                <span className="text-sm font-bold text-amber-500 bg-white p-1">
                  0.0
                </span>
                <span>Total Rating 0</span>
              </div>
            </div>
          </div>
          {/* description & location */}
          <div>
            <div className="my-4">
              <h1 className="text-2xl">Description</h1>
              <p className="font-arima mt-1">{post.description}</p>
            </div>
            <div className="my-4">
              <h1 className="text-2xl">Location</h1>
              <p className="font-arima mt-1">{post.location}</p>
            </div>
          </div>
          {/* rating & comment */}
          <div>
            <div className="my-4">
              <h1 className="text-2xl">Your Rating:</h1>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`text-2xl ${
                      (hover || rating) >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleSubmitRating()}
                className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-400 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Rating"}
              </button>
            </div>
            <div className="my-4">
              <h1 className="text-2xl mb-2">Your Comment:</h1>
              <form>
                <textarea
                  placeholder="Write a comment"
                  className="w-full border rounded p-2 mb-2 resize-none"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </form>
              <button
                onClick={() => handleCommentSubmit()}
                className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </button>
            </div>
            <div>
              {Array.from({ length: 5 })?.map((comment: any, index) => (
                <div key={index}>
                  <div className="my-4 flex flex-col sm:flex-row">
                    <div>
                      <img
                        alt="commenter image"
                        src={
                          comment?.image
                            ? comment?.image
                            : "https://i.ibb.co/DMYmT3x/Generic-Profile.jpg"
                        }
                        className="rounded-full w-10 h-10 object-cover dark:border-white border border-black"
                      />
                    </div>
                    <div className="pl-4">
                      <h1 className="text-2xl font-bold">
                        {comment?.name || "Mike Alan"}
                      </h1>
                      <small className="font-sans">
                        {comment?.time || "03:07 PM"} ~{" "}
                        {comment?.date || "5/4/2025"}
                      </small>
                      <p className="py-4">
                        {comment?.comment || "Very Nice try it"}
                      </p>
                      <hr />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
