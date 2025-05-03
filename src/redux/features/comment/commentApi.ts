import { baseApi } from "@/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (commentData) => ({
        url: `/comment/${commentData.postId}`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["comments"],
    }),
    getSinglePostComment: builder.query({
      query: (id: string) => ({
        url: `/comment/post-comment/${id}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
  }),
});

export const { useAddCommentMutation, useGetSinglePostCommentQuery } =
  commentApi;
