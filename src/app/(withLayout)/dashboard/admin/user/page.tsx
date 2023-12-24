"use client";

import Loading from "@/app/loading";
import { useGetUsersQuery } from "@/redux/api/userApi";
import React from "react";
import UMTable from "@/components/ui/UMTable";

const UserPage = () => {
  const { data, isLoading } = useGetUsersQuery(undefined);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "ContactNo",
      dataIndex: "contactNo",
    },
  ];

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="">
      <h1 className="py-2 text-center bg-gray-300">All Users</h1>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data}
        showSizeChanger={true}
      />
    </div>
  );
};

export default UserPage;
