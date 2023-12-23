"use client";

import { AUTH_KEY } from "@/constants/storageKey";
import { logout } from "@/redux/slice/userSlice";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import {
  HomeOutlined,
  ReadOutlined,
  OrderedListOutlined,
  HeartOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

type navBtnProps = {
  showDrawer: () => void;
  flexDir?: string;
};

const NavbarBtn = ({ flexDir, showDrawer }: navBtnProps) => {
  const dispatch = useDispatch();
  const { id, role } = getUserInfo() as any;
  const loginResponse = useSelector((state: any) => state?.user);
  const isLoggedIn = loginResponse?.isLoggedIn;

  const router = useRouter();
  const logOut = () => {
    removeUserInfo(AUTH_KEY);
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={`flex ${flexDir}`}>
      {isLoggedIn && (
        <Link
          className="text-center  border-solid border-[1px] rounded-md border-blue-500 m-1 "
          href={`/dashboard/${role}/profile`}
        >
          <Button
            onClick={showDrawer}
            className="text-white hover:text-blue-500"
            type="link"
            icon={<HeartOutlined />}
          >
            Dashboard
          </Button>
        </Link>
      )}
      {!isLoggedIn ? (
        <Link className="" href={"/login"}>
          <Button
            onClick={showDrawer}
            size="middle"
            className="text-white w-full text-center  border-solid border-[1px] rounded-md border-blue-500 m-1 "
            type="primary"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
        </Link>
      ) : (
        <Link href={"/"}>
          <Button
            onClick={logOut}
            size="middle"
            className="text-white w-full text-center  border-solid border-[1px] rounded-md m-1 "
            type="primary"
            danger
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarBtn;
