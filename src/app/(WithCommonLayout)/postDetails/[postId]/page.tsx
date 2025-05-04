"use client";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useAddCommentMutation,
  useGetSinglePostCommentQuery,
} from "@/redux/features/comment/commentApi";
import { useGetSingleApprovedPostQuery } from "@/redux/features/post/postApi";
import {
  useAddRatingMutation,
  useAddVoteMutation,
} from "@/redux/features/rating/ratingApi";
import { ThumbsDown, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function PostDetails({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const [comment, setComment] = useState("");
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const [postId, setPostId] = useState<string>("");
  const { data, refetch } = useGetSingleApprovedPostQuery(postId, {
    skip: !postId,
    refetchOnReconnect: true,
  });
  const { data: comments, refetch: commentRefetch } =
    useGetSinglePostCommentQuery(postId, {
      skip: !postId,
      refetchOnReconnect: true,
    });
  const [addComment, { isLoading }] = useAddCommentMutation();
  const [addRating] = useAddRatingMutation();
  const [addVote] = useAddVoteMutation();
  const post = data?.data;
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    (async () => {
      const { postId } = await params;
      setPostId(postId);
    })();
  }, [params]);

  useEffect(() => {
    setUpVote(
      post?.votes?.filter((vote: any) => vote?.voteType === "UPVOTE")?.length
    );
    setDownVote(
      post?.votes?.filter((vote: any) => vote?.voteType === "DOWNVOTE")?.length
    );
  }, [post]);

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.success("Please login to comment.");
      return;
    }
    try {
      const commentData = { content: comment, postId: postId };
      const res = await addComment(commentData);
      if (res?.data?.success) {
        toast.success("Comment successfully added!");
        setComment("");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (!user) {
      toast.success("Please login to give rating.");
      return;
    }
    if (!rating) return alert("Please give a rating.");

    setIsSubmitting(true);
    try {
      const ratingData = { rating: rating, postId: postId };
      const res = await addRating(ratingData);
      if (res?.data?.success) {
        toast.success("Rating successfully added!");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitVote = async (voteType: string) => {
    if (!user) {
      toast.success("Please login to vote.");
      return;
    }
    try {
      const voteData = { voteType: voteType, postId: postId };
      const res = await addVote(voteData);
      if (res?.data?.success) {
        toast.success("Vote successfully added!");
        if (voteType === "UPVOTE") setUpVote(upVote + 1);
        else setDownVote(downVote + 1);
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratings = post?.reviews?.map((review: any) => review?.rating);
  const total = ratings?.reduce((acc: any, cur: any) => acc + cur, 0);
  const averageRating =
    ratings?.length > 0 ? (total / ratings?.length)?.toFixed(1) : 0.0;

  console.log(comments);
  //   console.log(post);
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
                <button
                  onClick={() => handleSubmitVote("UPVOTE")}
                  className="flex items-center gap-1 cursor-pointer hover:bg-amber-400 p-1 rounded
              "
                >
                  <ThumbsUpIcon />
                  <span className="text-sm">{upVote}</span>
                </button>
                <button
                  onClick={() => handleSubmitVote("DOWNVOTE")}
                  className="flex items-center gap-1 cursor-pointer hover:bg-amber-400 p-1 rounded
              "
                >
                  <ThumbsDown />
                  <span className="text-sm">{downVote}</span>
                </button>
              </div>
              <div className="flex flex-col w-fit items-center">
                <span className="text-sm font-bold text-amber-500 bg-white p-1">
                  {averageRating}
                </span>
                <span>Total Rating {ratings.length}</span>
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
              {comments?.data?.map((comment: any, index: number) => {
                const formattedTime = new Date(
                  comment?.createdAt
                ).toLocaleTimeString();
                const formattedDate = new Date(
                  comment?.createdAt
                ).toLocaleDateString();
                return (
                  <div key={index}>
                    <div className="my-4 flex flex-col sm:flex-row">
                      <div>
                        <Image
                          width={200}
                          height={200}
                          alt="commenter image"
                          src={
                            comment?.user?.profilePhoto ||
                            "https://i.ibb.co/DMYmT3x/Generic-Profile.jpg"
                          }
                          className="rounded-full w-10 h-10 object-cover dark:border-white border border-black"
                        />
                      </div>
                      <div className="pl-4">
                        <h1 className="text-2xl font-bold">
                          {comment?.user?.name || "Mike Alan"}
                        </h1>
                        <small className="font-sans">
                          {formattedTime || "03:07 PM"} ~{" "}
                          {formattedDate || "5/4/2025"}
                        </small>
                        <p className="py-4">
                          {comment?.content || "Very Nice try it"}
                        </p>
                        <hr />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
