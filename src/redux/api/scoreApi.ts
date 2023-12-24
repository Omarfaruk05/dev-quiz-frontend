import { IMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const URL = "/scores";

export const scoreApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createScore: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.score],
    }),
    getAllScore: build.query({
      query: () => ({
        url: URL,
        method: "GET",
      }),
      providesTags: [tagTypes.score],
    }),
    getSingScore: build.query({
      query: (id: string) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.score],
    }),
    updateScore: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.score],
    }),

    deleteScore: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.score],
    }),
  }),
});

export const {
  useCreateScoreMutation,
  useGetAllScoreQuery,
  useGetSingScoreQuery,
  useUpdateScoreMutation,
  useDeleteScoreMutation,
} = scoreApi;
