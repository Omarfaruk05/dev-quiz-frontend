/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/app/loading";
import { useGetAllQuizQuery } from "@/redux/api/quizApi";
import { getUserInfo } from "@/services/auth.service";
import Link from "next/link";
import React from "react";

const QuizCategory = () => {
  const { id } = getUserInfo() as any;
  const { data, isLoading } = useGetAllQuizQuery(undefined);
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-[73.5vh]">
      <h1 className="my-4 bg-gray-200 py-1 px-5 rounded-md w-fit mx-auto">
        Quiz Category
      </h1>
      <div className="flex gap-4 flex-wrap justify-center mt-12">
        {data &&
          data?.map((quiz: any, index: any) => (
            <Link key={index} href={id ? `quiz/${quiz?.id}` : "/login"}>
              {" "}
              <div className="bg-gray-800 py-2 px-6 cursor-pointer text-white text-center rounded-md shadow-md hover:shadow-xl hover:rounded-xl trnasition duration-200">
                <div>
                  <img
                    width={100}
                    height={100}
                    src={`${quiz?.logo}`}
                    alt={"quiz_logo"}
                  />
                </div>
                <div className="mt-3">
                  <p>{quiz?.name}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default QuizCategory;
