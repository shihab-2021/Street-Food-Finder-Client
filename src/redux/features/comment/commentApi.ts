import { baseApi } from "@/redux/api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (commentData) => ({
        url: `/comment/${commentData.postId}`,
        method: "POST",
        body: commentData,
      }),
    }),
  }),
});

export const { useAddCommentMutation } = commentApi;
