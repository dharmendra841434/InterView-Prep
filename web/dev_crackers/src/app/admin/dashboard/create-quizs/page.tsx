"use client";

import CustomImagePicker from "@/components/common/CustomImagePicker";
import CustomTextInput from "@/components/common/CustomInput";
import Dropdown from "@/components/common/Dropdown";
import QuizView from "@/components/QuizView";
import { quizTopics } from "@/constant/quizTopics";
import useGenerateAssets from "@/hooks/othersFeatursHooks/useGenerateAssets";
import useCreateQuiz from "@/hooks/quizHooks/useCreateQuiz";
import uploadToCloudinary from "@/hooks/uploadToCloudinary";
import Image from "next/image";
import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Errors {
  title?: string;
  quizType?: string;
  questions?: string;
  posterImage?: string;
}

const ArticlesPage: React.FC = () => {
  const [posterImage, setPosterImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [quizType, setQuizType] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    },
  ]);
  const [errors, setErrors] = useState<Errors>({});
  const [content, setContent] = useState("");
  const { generateAssets, generateAssetsLoading } = useGenerateAssets({
    setAssets: (resp: any) => {
      setContent(resp);
      setQuestions(JSON.parse(resp));
    },
    type: "generate-quiz",
  });
  const handleReset = () => {
    setTitle("");
    setContent("");
    setErrors({});
    setPosterImage(null);
    setSelectedTopic("");
    setQuestions([
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);
    setQuizType("");
  };

  const { createQuiz, createQuizLoading, isCreateQuizSuccess } = useCreateQuiz({
    handleReset: handleReset,
  });

  const validateForm = (): boolean => {
    let isValid = true;
    let newErrors: Errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!quizType.trim()) {
      newErrors.quizType = "Quiz type is required";
      isValid = false;
    }
    if (posterImage == null) {
      newErrors.posterImage = "posterImage is required";
      isValid = false;
    }
    if (!content) {
      if (questions.length < 1 || !questions[0].question.trim()) {
        newErrors.questions = "At least one question is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      //  console.log(questions, "Valid Form Submission");
      const imageUrl = await uploadToCloudinary(posterImage);
      console.log(content, "quiz");

      if (imageUrl) {
        const payload = {
          title,
          topic: content ? selectedTopic : quizType,
          questions: content ? content : JSON.stringify(questions),
          poster: imageUrl,
        };
        createQuiz(payload);
      }
    }
  };

  const handleInputChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      field: keyof Errors
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const handleQuestionChange = (index: number, value: string): void => {
    setQuestions((prev) => {
      const updatedQuestions = [...prev];
      updatedQuestions[index].question = value;
      return updatedQuestions;
    });
    if (index === 0) {
      setErrors((prev) => ({ ...prev, questions: "" }));
    }
  };

  function removeObjectByIndex(index: any) {
    if (index < 0 || index >= questions?.length) {
      console.error("Invalid index");
      return questions;
    }
    setQuestions(questions.slice(0, index).concat(questions.slice(index + 1)));
  }

  const handleGenerateArticle = () => {
    setQuizType(selectedTopic);
    generateAssets({
      message: `create a quiz on ${selectedTopic} of 10 question every question have 4 options and one answer and give me response in array of objects`,
    });
  };

  // console.log(content);

  return (
    <div className="custom-ScrollBar">
      <div className="w-full flex justify-center items-center pb-10">
        <h3 className="font-medium text-3xl underline">Create New Quiz</h3>
      </div>
      <div>
        <CustomTextInput
          label="Title of Quiz"
          placeholder="Write quiz title..."
          value={title}
          onChange={handleInputChange(setTitle, "title")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm pt-3">{errors.title}</p>
        )}

        <div className="my-5">
          <CustomTextInput
            label="Type of Quiz"
            placeholder="Write quiz type..."
            value={quizType}
            onChange={handleInputChange(setQuizType, "quizType")}
          />
          {errors.quizType && (
            <p className="text-red-500 text-sm pt-3">{errors.quizType}</p>
          )}
        </div>

        <div className="my-5">
          <CustomImagePicker
            onImageSelect={(img: any) => {
              setErrors((prev) => ({ ...prev, posterImage: "" }));
              setPosterImage(img);
            }}
            label="Select Poster Image"
          />
          <Image
            width={200}
            height={200}
            src={
              posterImage
                ? URL.createObjectURL(posterImage)
                : "/placeholder.jpg"
            }
            alt="poster"
            className="w-48 h-48 object-cover rounded"
          />
          {errors.posterImage && (
            <p className="text-red-500 text-sm pt-3">{errors.posterImage}</p>
          )}
        </div>

        <div className="my-5">
          <Dropdown
            label="Topic"
            items={quizTopics}
            value={selectedTopic}
            onSelectItem={(item: string) => {
              setSelectedTopic(item);
              setErrors((prev) => ({ ...prev, questions: "" }));
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleGenerateArticle}
            disabled={generateAssetsLoading}
            className="mt-4 px-20 py-2 bg-green-500 transition-all duration-300 ease-in-out hover:bg-green-600 cursor-pointer text-white rounded"
          >
            {generateAssetsLoading
              ? "Generating Content...."
              : "Generate Questions"}
          </button>
          <p
            onClick={() => {
              console.log(
                content
                  ?.replace(/^```json\s*/, "")
                  .replace(/```$/, "")
                  .trim()
              );
            }}
            className="underline mt-12"
          >
            OR
          </p>
        </div>
        <>
          {questions.map((item, index) => (
            <div key={index} className="mt-5 relative">
              <CustomTextInput
                label={`Question ${index + 1}`}
                placeholder="Write question..."
                value={item.question}
                readOnly={content ? true : false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuestionChange(index, e.target.value)
                }
              />
              {index >= 1 && (
                <button
                  onClick={() => removeObjectByIndex(index)}
                  className=" absolute right-0 top-0  text-red-500 text-xs transition-all duration-300 ease-in-out hover:scale-125 pt-3 cursor-pointer"
                >
                  Remove
                </button>
              )}
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 py-4">
                {item.options.map((option, optIndex) => (
                  <CustomTextInput
                    key={optIndex}
                    label={`Option ${optIndex + 1}`}
                    placeholder={`Write option ${optIndex + 1}`}
                    value={option}
                    readOnly={content ? true : false}
                    onChange={(e) => {
                      setErrors((prev) => ({ ...prev, questions: "" }));
                      setQuestions((prev) => {
                        const updatedQuestions = [...prev];
                        updatedQuestions[index].options[optIndex] =
                          e.target.value;
                        return updatedQuestions;
                      });
                    }}
                  />
                ))}
              </div>
              <CustomTextInput
                label="Answer of Quiz"
                placeholder="Write quiz answer"
                readOnly={content ? true : false}
                value={item.answer}
                onChange={(e) => {
                  setErrors((prev) => ({ ...prev, questions: "" }));
                  setQuestions((prev) => {
                    setErrors((prev) => ({ ...prev, questions: "" }));
                    const updatedQuestions = [...prev];
                    updatedQuestions[index].answer = e.target.value;
                    return updatedQuestions;
                  });
                }}
              />
            </div>
          ))}
        </>
        {errors.questions && (
          <p className="text-red-500 text-sm pt-3">{errors.questions}</p>
        )}

        <div className=" flex flex-row items-center justify-end py-5">
          <button
            onClick={() => {
              setQuestions((prev) => [
                ...prev,
                { question: "", options: ["", "", "", ""], answer: "" },
              ]);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-600 text-white rounded"
          >
            Add More
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={createQuizLoading}
          className="mt-4 px-4 py-2 cursor-pointer bg-yellow-500 transition-all duration-300 ease-in-out hover:bg-yellow-600 text-white rounded"
        >
          {createQuizLoading ? "Publishing...." : " Publish Your Quiz"}
        </button>
      </div>
    </div>
  );
};

export default ArticlesPage;
