"use client";

import { Drawer } from "antd";
import NavbarBtn from "./NavbarBtn";

type drawerProps = {
  open: boolean;
  showDrawer: () => void;
  onClose: () => void;
};

const NavDrawer = ({ open, onClose, showDrawer }: drawerProps) => {
  return (
    <div>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        className="bg-slate-900 bg-opacity-75"
      >
        <NavbarBtn flexDir="flex-col" showDrawer={showDrawer} />
      </Drawer>
    </div>
  );
};

export default NavDrawer;
