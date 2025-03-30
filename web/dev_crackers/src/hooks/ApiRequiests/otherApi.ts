import axiosInstance from "../ApiRequiests/axiosInstance";

// Function to create a new group
export const generateAssetsApiRequest = async (payload: any, type: any) => {
  const response = await axiosInstance.post(
    `/other-features/generate-assets/${type}`,
    payload
  );
  return response.data || response; // Assuming the response contains the data
};

// Function to fetch all users data
export const adminLoginRequest = async (payload: any) => {
  const response = await axiosInstance.post(`/admin/login`, payload, {
    withCredentials: true,
  });
  return response.data || response; // Assuming the response contains the data
};

// Function to  execute Code
export const executeCodeRequest = async (payload: any) => {
  const response = await axiosInstance.post(
    `/other-features/execute-code`,
    payload
  );
  return response.data || response; // Assuming the response contains the data
};
