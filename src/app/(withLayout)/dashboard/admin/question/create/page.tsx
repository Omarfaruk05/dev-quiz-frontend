"use client";

import React from "react";
import { Button, Col, Row, message } from "antd";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import { useGetAllQuizQuery } from "@/redux/api/quizApi";
import Loading from "@/app/loading";
import { useCreateQuestionMutation } from "@/redux/api/questionApi";

const CreateQuestionPage = () => {
  const { data, isLoading } = useGetAllQuizQuery(undefined);
  const [createQuestion] = useCreateQuestionMutation();

  if (isLoading) {
    return <Loading />;
  }
  const onSubmit = async (data: any) => {
    try {
      message.loading("Please wite");
      const res = await createQuestion(data).unwrap();
      console.log(res);
      if (res?.id) {
        message.success("Question created successfull.");
      }
    } catch (error: any) {
      message.error(error);
      console.error(error.message);
    }
  };

  const quizOptions = data?.map((quiz: any) => {
    return {
      label: quiz?.name,
      value: quiz.id,
    };
  });
  return (
    <div>
      <h1 className=" mt-12 text-center mb-4">
        Please Input Your Question Information
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
                  name="question"
                  size="large"
                  label="Question"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="options[0]"
                  size="large"
                  label="Option-1"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="options[1]"
                  size="large"
                  label="Option-2"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="options[2]"
                  size="large"
                  label="Option-3"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="options[3]"
                  size="large"
                  label="Option-4"
                />
              </Col>
              <Col
                className="gutter-row"
                span={16}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="correctAnswer"
                  size="large"
                  label="Correct Ans."
                  placeholder="Enter Correct Answer"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  name="quizId"
                  size="large"
                  label="Quiz Category"
                  placeholder="Select Quiz"
                  options={quizOptions}
                />
              </Col>
            </Row>
            <div className="text-center">
              <Button
                className="text-white bg-slate-800"
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

export default CreateQuestionPage;
