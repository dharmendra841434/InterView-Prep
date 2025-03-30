import axiosInstance from "./axiosInstance";

// Function to fetch all users data
export const loginRequest = async (payload) => {
  const response = await axiosInstance.post(`/admin/login`, payload, {
    withCredentials: true,
  });
  return response.data || response; // Assuming the response contains the data
};
