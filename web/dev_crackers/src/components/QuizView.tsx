import React, { useState } from "react";

interface QuizProps {
  quizData: any;
}

const QuizView: React.FC<QuizProps> = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  //console.log(typeof quizData);
  console.log(quizData);

  return <></>;
};

export default QuizView;
