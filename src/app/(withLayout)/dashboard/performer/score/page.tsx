/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/app/loading";
import { useGetSingUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";

const ScorePage = () => {
  const { id } = getUserInfo() as any;
  const { data, isLoading } = useGetSingUserQuery(id);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4">
      <h1 className="mx-auto w-fit bg-gray-800 text-white px-3 rounded-md">
        Quiz Scores
      </h1>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {data?.scores.map((score: any, index: any) => (
          <div
            className="p-4 text-center rounded-md bg-gray-700 text-white"
            key={index}
          >
            <img
              src={score?.quiz?.logo}
              alt="quiz_logo"
              height={80}
              width={80}
              className="rounded-md"
            />
            <h2>{score?.quiz?.name}</h2>
            <h1 className=" mx-auto text-xl bg-purple-500 text-white font-semibold rounded-full h-12 w-12 flex justify-center items-center">
              {score.score}/{score?.quiz?.questions?.length}
            </h1>
            <h3 className="mt-2">
              Your Score {score?.score} out of {score?.quiz?.questions?.length}
            </h3>
            <h3>
              Percentage:{" "}
              {((score?.score * 100) / score?.quiz?.questions?.length).toFixed(
                2
              )}
              %
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScorePage;
