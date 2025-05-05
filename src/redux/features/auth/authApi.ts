import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
      invalidatesTags: ["profile"],
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    profile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useProfileQuery } = authApi;
