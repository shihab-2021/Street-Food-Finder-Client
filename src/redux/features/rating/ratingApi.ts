import { baseApi } from "@/redux/api/baseApi";

const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: (ratingData) => ({
        url: `/review/${ratingData.postId}`,
        method: "POST",
        body: ratingData,
      }),
    }),
    addVote: builder.mutation({
      query: (voteData) => ({
        url: `/vote/${voteData.postId}`,
        method: "POST",
        body: voteData,
      }),
    }),
  }),
});

export const { useAddRatingMutation, useAddVoteMutation } = ratingApi;
