import { IMeta } from "@/types";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const QUIZ_URL = "/quizs";

export const quizApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createQuiz: build.mutation({
      query: (data) => ({
        url: `${QUIZ_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.performer],
    }),
    getAllQuiz: build.query({
      query: () => ({
        url: QUIZ_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.performer],
    }),
    getSingQuiz: build.query({
      query: (id: string) => ({
        url: `${QUIZ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.performer],
    }),
    updateQuiz: build.mutation({
      query: ({ id, data }) => ({
        url: `${QUIZ_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.performer],
    }),

    deleteQuiz: build.mutation({
      query: (id) => ({
        url: `${QUIZ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.performer],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetAllQuizQuery,
  useGetSingQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;
