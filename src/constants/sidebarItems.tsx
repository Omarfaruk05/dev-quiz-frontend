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
      label: <Link href={`/dashboard/${role}/booking`}>My Scors</Link>,
      key: "all-bookings",
      icon: <OrderedListOutlined />,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <p>All Users</p>,
      key: "all-users",
      icon: <TableOutlined />,
    },
    {
      label: <Link href={`/dashboard/${role}/all-house`}>All Quiz</Link>,
      key: "all-Quiz",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href={`/dashboard/${role}/booked-house`}>All Question</Link>,
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
