/* eslint-disable @next/next/no-img-element */
"use client";

import Loading from "@/app/loading";
import UMTable from "@/components/ui/UMTable";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";
import { useGetAllQuizQuery } from "@/redux/api/quizApi";

const QuizPage = () => {
  const { role } = getUserInfo() as any;
  const { data, isLoading } = useGetAllQuizQuery(undefined);

  const columns = [
    {
      title: "Quiz Category",
      dataIndex: "",
      render: function (data: any) {
        return (
          <img
            src={data?.logo}
            alt="quiz_logo"
            width={40}
            className="bg-gray-900 rounded-md"
          />
        );
      },
    },
    {
      title: "Quiz Category",
      dataIndex: "",
      render: function (data: any) {
        return <h2>{data?.name}</h2>;
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="bg-gray-300 py-2 px-4 flex justify-between items-center">
        <h3>{"Create Quiz ->"}</h3>
        <Link href={`/dashboard/${role}/quiz/create`}>
          {" "}
          <Button className="bg-black text-white font-semibold">Create</Button>
        </Link>
      </div>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        showSizeChanger={true}
      />
    </div>
  );
};

export default QuizPage;
