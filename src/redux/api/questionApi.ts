import { IMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const QUESTION_URL = "/questions";

export const questionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createQuestion: build.mutation({
      query: (data) => ({
        url: `${QUESTION_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.question],
    }),
    getAllQuestion: build.query({
      query: () => ({
        url: QUESTION_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),
    getSingQuestion: build.query({
      query: (id: string) => ({
        url: `${QUESTION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.question],
    }),
    updateQuestion: build.mutation({
      query: ({ id, data }) => ({
        url: `${QUESTION_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.question],
    }),

    deleteQuestion: build.mutation({
      query: (id) => ({
        url: `${QUESTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.question],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetAllQuestionQuery,
  useGetSingQuestionQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
