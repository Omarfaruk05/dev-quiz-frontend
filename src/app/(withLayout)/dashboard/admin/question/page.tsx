"use client";

import Loading from "@/app/loading";
import { Button, message } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import UMTable from "@/components/ui/UMTable";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionQuery,
} from "@/redux/api/questionApi";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";

const QuestionPage = () => {
  const { role } = getUserInfo() as any;
  const { data, isLoading } = useGetAllQuestionQuery(undefined);
  const [deleteQuestion] = useDeleteQuestionMutation();

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      console.log(data);
      const res = await deleteQuestion(id).unwrap();
      if (res?.id) {
        message.success("Question deleted successfully");
      }
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  console.log(data);
  const columns = [
    {
      title: "Question",
      dataIndex: "question",
    },
    {
      title: "Options",
      dataIndex: "",
      render: function (data: any) {
        return (
          <ol className="list-disc">
            {data?.options.map((option: any, index: any) => (
              <li key={index}>{option}</li>
            ))}
          </ol>
        );
      },
    },
    {
      title: "Correct Ans.",
      dataIndex: "correctAnswer",
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <Button onClick={() => deleteHandler(data?.id)} type="primary" danger>
            <DeleteOutlined />
          </Button>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="py-3 px-4 bg-gray-300 flex justify-between items-center">
        <h3>{"Create Question ->"}</h3>
        <Link href={`/dashboard/${role}/question/create`}>
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

export default QuestionPage;
