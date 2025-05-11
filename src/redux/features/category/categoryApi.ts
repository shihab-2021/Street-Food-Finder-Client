import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getDashboardOverview: builder.query({
      query: () => ({
        url: "/category/get-dashboard-overview",
        method: "GET",
      }),
    }),
    getDashboardPaymentOverview: builder.query({
      query: () => ({
        url: "/category/get-payment-overview",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useGetDashboardOverviewQuery,
  useGetDashboardPaymentOverviewQuery,
} = categoryApi;
