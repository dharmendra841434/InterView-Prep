"use client";
import CustomImagePicker from "@/components/common/CustomImagePicker";
import CustomTextInput from "@/components/common/CustomInput";
import JoditRichTextEditor from "@/components/common/JoditRichTextEditor";
import useCreateArticle from "@/hooks/articleHooks/useCreateArticle";
import useGenerateAssets from "@/hooks/othersFeatursHooks/useGenerateAssets";
import Image from "next/image";
import React, { useRef, useState } from "react";
import uploadToCloudinary from "@/hooks/uploadToCloudinary";

type RichTextEditorHandle = {
  getContent: () => string;
};

export default function CreateArticles() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [askForContent, setAskForContent] = useState("");
  const [content, setContent] = useState("");
  const [posterImage, setPosterImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    topic?: string;
    posterImage?: string;
    content?: string;
  }>({});

  const { generateAssets, generateAssetsLoading } = useGenerateAssets({
    setAssets: setContent,
    type: "generate-article",
  });

  const handleReset = () => {
    setTitle("");
    setContent("");
    setErrors({});
    setPosterImage(null);
    setTopic("");
    setAskForContent("");
  };

  const { createArticle, createArticleLoading } = useCreateArticle({
    handleReset: handleReset,
  });

  const handleSubmit = async () => {
    let validationErrors: any = {};
    if (!title.trim()) validationErrors.title = "Title is required";
    if (!topic.trim()) validationErrors.topic = "Article topic is required";
    if (posterImage == null)
      validationErrors.posterImage = "Poster image is required";
    if (!content.trim())
      validationErrors.content = "Article content cannot be empty";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully");
      const imageUrl = await uploadToCloudinary(posterImage);

      if (imageUrl) {
        const payload = {
          title: title,
          topic: topic,
          poster: imageUrl,
          body: content,
        };
        createArticle(payload);
      }
    }
  };

  const handleGenerateArticle = () => {
    generateAssets({
      message: askForContent,
    });
  };

  return (
    <div className="lg:p-4">
      <div className="w-full flex justify-center items-center pb-10">
        <h3 className="font-medium text-3xl underline">Create New Article</h3>
      </div>
      <div>
        <CustomTextInput
          label="Title of Article"
          placeholder="Write article title..."
          value={title}
          onChange={(e: any) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: "" }));
          }}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <div className="my-5">
          <CustomTextInput
            label="Article topic"
            placeholder="Write type..."
            value={topic}
            onChange={(e: any) => {
              setTopic(e.target.value);
              setErrors((prev) => ({ ...prev, topic: "" }));
            }}
          />
          {errors.topic && (
            <p className="text-red-500 text-sm">{errors.topic}</p>
          )}
        </div>

        <div className="my-5">
          <CustomImagePicker
            onImageSelect={(img: any) => {
              setPosterImage(img);
              setErrors((prev) => ({ ...prev, posterImage: "" }));
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
            <p className="text-red-500 text-sm">{errors.posterImage}</p>
          )}
        </div>
      </div>

      <div className="my-5">
        <CustomTextInput
          label="Ask for Content"
          placeholder="Describe the content you want to generate..."
          value={askForContent}
          onChange={(e: any) => setAskForContent(e.target.value)}
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
            : "Generate Article"}
        </button>
        <p className="underline mt-12 font-light">OR</p>
      </div>
      <div className="mt-10">
        <h1 className=" font-light text-gray-700 mb-3">
          Start writing article
        </h1>
        <JoditRichTextEditor
          value={content}
          onChange={(newContent: string) => {
            setContent(newContent);
            setErrors((prev) => ({ ...prev, content: "" }));
          }}
          ref={editorRef}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 cursor-pointer bg-yellow-500 transition-all duration-300 ease-in-out hover:bg-yellow-600 text-white rounded"
      >
        {createArticleLoading ? "Publishing..." : "Publish Your Article"}
      </button>
    </div>
  );
}
