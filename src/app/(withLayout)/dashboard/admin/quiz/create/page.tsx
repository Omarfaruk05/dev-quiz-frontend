"use client";

import React from "react";
import { Button, Col, Row, message } from "antd";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useCreateQuizMutation } from "@/redux/api/quizApi";

const CreateQuizPage = () => {
  const [createQuiz] = useCreateQuizMutation();

  const onSubmit = async (data: any) => {
    try {
      message.loading("Please wite");
      const res = await createQuiz(data).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Quiz created successfull.");
      }
    } catch (error: any) {
      message.error(error);
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1 className=" mt-12 text-center mb-4">
        Please Input Your Quiz Information
      </h1>
      <div>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Form submitHandler={onSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Name"
                  placeholder="Enter Quiz Category Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="logo"
                  size="large"
                  label="Logo"
                  placeholder="Category Image link"
                />
              </Col>
            </Row>
            <div className="text-center">
              <Button
                className="bg-slate-800 text-white "
                size="large"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
