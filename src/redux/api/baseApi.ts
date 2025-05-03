import { toast } from "sonner";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  // More comprehensive error handling
  if (result?.error) {
    switch (result.error.status) {
      case 404:
        toast.error(`404: Server not found!`);
        break;
      case 401:
        try {
          if ((api.getState() as RootState)?.auth?.token !== null) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
              {
                method: "POST",
                credentials: "include",
              }
            );

            const data = await res.json();

            if (data?.data?.accessToken) {
              const user = (api.getState() as RootState).auth.user;

              api.dispatch(
                setUser({
                  user,
                  token: data.data.accessToken,
                })
              );

              result = await baseQuery(args, api, extraOptions);
            } else {
              // api.dispatch(logout());
            }
          }
        } catch (error) {
          console.error("Token refresh error:", error);

          api.dispatch(logout());
        }
        break;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "users",
    "profile",
    "orgs",
    "meals",
    "org",
    "meal",
    "bookings",
    "provider-orders",
    "pending-orders",
    "comments",
  ],
  endpoints: () => ({}),
  keepUnusedDataFor: 30, // Keep unused data for 30 seconds
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
});
