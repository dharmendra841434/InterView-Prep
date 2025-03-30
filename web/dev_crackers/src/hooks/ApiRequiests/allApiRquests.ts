import axiosInstance from "./axiosInstance";

// Function to create a new article
export const createNewArticleRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/article/create-new`, payload);
  return response.data || response; // Assuming the response contains the data
};

// Function to create a new quiz
export const createNewQuizRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/quiz/create-new`, payload);
  return response.data || response; // Assuming the response contains the data
};
