import { baseApi } from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/post/get-approved-post",
        method: "GET",
      }),
      providesTags: ["posts", "post"],
    }),
    getProPost: builder.query({
      query: () => ({
        url: "/post/get-premium-post",
        method: "GET",
      }),
      providesTags: ["posts", "post"],
    }),
    getSingleApprovedPost: builder.query({
      query: (id: string) => ({
        url: `/post/get-approved-post/${id}`,
        method: "GET",
      }),
      providesTags: ["post", "posts"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetProPostQuery,
  useGetSingleApprovedPostQuery,
} = postApi;
