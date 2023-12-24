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
      query: () => ({
        url: USER_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.performer],
    }),
    getSingUser: build.query({
      query: (id: any) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.performer],
    }),
    updateMyProfile: build.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `${USER_URL}/${id}`,
        method: "PATCH",
        data: updatedData,
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
} = userApi;
