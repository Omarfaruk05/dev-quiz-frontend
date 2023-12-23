import { IMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addUser: build.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    login: build.mutation({
      query: (data) => ({
        url: `/auth/signin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    getUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: USER_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.performer],
    }),
    getSingUser: build.query({
      query: () => ({
        url: `${USER_URL}/user`,
        method: "GET",
      }),
      providesTags: [tagTypes.performer],
    }),
    updateMyProfile: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/update-profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.performer],
    }),
    makeAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data?.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.performer],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.performer],
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginMutation,
  useGetSingUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateMyProfileMutation,
  useMakeAdminMutation,
} = userApi;
