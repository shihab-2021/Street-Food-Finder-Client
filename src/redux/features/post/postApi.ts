import { baseApi } from "@/redux/api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/post/get-approved-post",
        method: "GET",
      }),
    }),
    getProPost: builder.query({
      query: () => ({
        url: "/post/get-premium-post",
        method: "GET",
      }),
    }),
    getSingleApprovedPost: builder.query({
      query: (id: string) => ({
        url: `/post/get-approved-post/${id}`,
        method: "GET",
      }),
      providesTags: [],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetProPostQuery,
  useGetSingleApprovedPostQuery,
} = postApi;
