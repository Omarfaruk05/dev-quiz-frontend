"use client";
import { Button, message, Steps, theme, Checkbox, Divider } from "antd";
import { useGetSingQuizQuery } from "@/redux/api/quizApi";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useCreateScoreMutation } from "@/redux/api/scoreApi";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingUserQuery } from "@/redux/api/userApi";

const QuizHome = ({ id }: { id: string }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [exam, setExam] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState();

  const { id: userId } = getUserInfo() as any;

  const [createScore] = useCreateScoreMutation();
  const { data, isLoading } = useGetSingQuizQuery(id);
  const { data: user, isLoading: userLoading } = useGetSingUserQuery(userId);

  const questions: any = data?.questions;

  useEffect(() => {
    if (user) {
      const match = user?.scores.some(
        (score: any) => score.quizId === data?.id
      );
      const score = user?.scores.find(
        (score: any) => score.quizId === data?.id
      );
      if (score) {
        setScore(score.score);
      }

      if (match !== undefined) {
        setExam(match);
      }
    }
  }, [user, data?.id]);

  if (isLoading) {
    return <Loading />;
  }

  const next = () => {
    setCurrent(current + 1);
    if (questions[current].correctAnswer === selectedOptions) {
      setScore(score + 1);
    }
  };

  const handleSubmit = async () => {
    message.loading("Loading...");
    if (questions[current]?.correctAnswer === selectedOptions) {
      setScore(score + 1);
    }

    const scoreData = {
      score,
      quizId: data?.id,
      userId,
    };
    //save to database
    try {
      const res = await createScore(scoreData).unwrap();
      if (res?.id) {
        message.success("Submit Successfull.");
      }
      if (res?.errorMessage) {
        message.success(res?.errorMessage);
      }
    } catch (error) {
      message.error("Something Went Wrong!");
    }
    setExam(true);
  };

  const items = questions?.map((item: any) => ({ key: item.title }));

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
      {!exam ? (
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
              {questions[current]?.question}
            </h2>

            <div className="mt-20">
              {questions[current]?.options.map((option: any, index: any) => (
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
                onClick={handleSubmit}
              >
                Done
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="font-semibold mt-12 w-fit bg-gray-200 text-center mx-auto p-12 md:p-28 lg:p-32 rounded-md">
          <h1 className=" mx-auto text-7xl bg-gray-800 text-white font-semibold rounded-full h-36 w-36 flex justify-center items-center">
            {score}/{questions?.length}
          </h1>
          <h3 className="mt-2">
            Your Score {score} out of {questions?.length}
          </h3>
          <h3>Percentage: {((score * 100) / questions?.length).toFixed(2)}%</h3>
        </div>
      )}
    </div>
  );
};

export default QuizHome;
