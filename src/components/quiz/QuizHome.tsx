"use client";
import { Button, message, Steps, theme, Checkbox, Divider } from "antd";
import { useGetSingQuizQuery } from "@/redux/api/quizApi";
import { useState } from "react";

const QuizHome = ({ id }: { id: string }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [scor, setScor] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState();

  const { data, isLoading } = useGetSingQuizQuery(id);

  const questions: any = data?.questions;

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const next = () => {
    setCurrent(current + 1);
    if (questions[current].correctAnswer === selectedOptions) {
      setScor(scor + 1);
    }
  };

  const items = questions.map((item: any) => ({ key: item.title }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    minHeight: "400px",
    marginTop: 16,
    padding: "15px",
  };

  // Function to handle option click
  const handleOptionClick = (selectedOption: any) => {
    setSelectedOptions(selectedOption);
  };

  // Function to check if an option is correct
  const isOptionCorrect = (option: any) => {
    return selectedOptions === option;
  };

  return (
    <div className="min-h-[74vh] max-w-7xl mx-auto">
      <h1 className="w-fit mx-auto py-2 px-12 bg-gray-800 mt-3 rounded-md text-white">
        Quiz Category: <span className="text-red-400">{data?.name}</span>
      </h1>
      <div className="mt-12 mx-4">
        <div className="hidden md:block">
          <Steps current={current} items={items} />
        </div>
        <div className="font-semibold text-gray-900" style={contentStyle}>
          <h2>
            {" "}
            <span className="px-[10px] bg-gray-900 text-white rounded-full">
              {current + 1}
            </span>{" "}
            {questions[current].question}
          </h2>

          <div className="mt-20">
            {questions[current].options.map((option: any, index: any) => (
              <div className="ml-12" key={index}>
                <p
                  onClick={() => handleOptionClick(option)}
                  className={
                    isOptionCorrect(option)
                      ? "py-2 px-3 rounded-md my-2 bg-gray-900 text-white w-96"
                      : "py-2 px-3 rounded-md my-2 bg-gray-200 w-96"
                  }
                >
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 pb-12 text-right">
          {current < questions.length - 1 && (
            <Button
              className="bg-gray-900 text-white rounded-md px-12"
              onClick={() => next()}
            >
              Next
            </Button>
          )}
          {current === questions.length - 1 && (
            <Button
              className="bg-teal-200 rounded-md px-12"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizHome;
