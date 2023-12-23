"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Form from "../forms/Form";
import FormInput from "../forms/FormInput";
import { Button, Col, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Link from "next/link";
import FormTextArea from "../forms/FormTextArea";
import FormSelectField from "../forms/FormSelectField";
import { useAddUserMutation } from "@/redux/api/userApi";
import FooterComponent from "../ui/FooterComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/schemas/user";

type FromValues = {
  name: string;
  email: string;
  contactNumber: string;
  role: "House Renter" | "house_renter";
  password: string;
  profileImage?: string;
  address?: string;
};

const SingUp = () => {
  const router = useRouter();

  const [addUser] = useAddUserMutation();

  const onSubmit: SubmitHandler<FromValues> = async (data: FromValues) => {
    try {
      const res = await addUser(data).unwrap();
      message.loading("Creating...");

      if (res?.id) {
        message.success("Signup Successfull. Please login.");
        router.push("/login");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="h-full opacity-75 ">
      <div>
        <div className="mx-4 flex justify-center items-center h-[90vh]">
          <Form submitHandler={onSubmit} resolver={yupResolver(userSchema)}>
            <div>
              <FormInput
                name="name"
                type="tex"
                size="large"
                placeholder="Enter Your Name"
                label="Name"
              />
            </div>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                placeholder="Enter Your Email"
                label="Email"
              />
            </div>
            <div
              className="w-72 md:w-96"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                placeholder="Enter Your Password"
                label="Password"
              />
            </div>
            <div className="text-center ">
              <Button
                className="w-full"
                type="primary"
                size="large"
                htmlType="submit"
              >
                Sign Up
              </Button>
            </div>
            <Link
              href={"/login"}
              className="hover:text-blue-500 no-underline hover:underline"
            >
              Already have Account?
            </Link>
          </Form>
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default SingUp;
