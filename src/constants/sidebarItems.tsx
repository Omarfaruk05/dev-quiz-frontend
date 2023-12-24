import type { MenuProps } from "antd";

import {
  TableOutlined,
  AppstoreOutlined,
  HomeOutlined,
  OrderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard/${role}/profile`}>My Profile</Link>,
      key: "profile",
      icon: <UserOutlined />,
    },
  ];

  const performerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/dashboard/${role}/score`}>My Scores</Link>,
      key: "score",
      icon: <OrderedListOutlined />,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/dashboard/${role}/user`}>All User</Link>,
      key: "all-user",
      icon: <TableOutlined />,
    },
    {
      label: <Link href={`/dashboard/${role}/quiz`}>All Quiz</Link>,
      key: "all-Quiz",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href={`/dashboard/${role}/question`}>All Question</Link>,
      key: "all-Question",
      icon: <AppstoreOutlined />,
    },
  ];

  if (role === USER_ROLE.PERFORMER) return performerSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};

export default sidebarItems;
