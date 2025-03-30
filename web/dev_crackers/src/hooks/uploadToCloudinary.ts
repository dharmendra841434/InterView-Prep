import axios from "axios";
import showToast from "@/components/common/ShowToast";

const uploadToCloudinary = async (
  file: File | null
): Promise<string | null> => {
  if (!file) return null;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "mystore");
  data.append("folder", "learningPlatform");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/devtrendy/image/upload",
      data,
      {
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded / progressEvent?.total) * 100
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      }
    );

    const imageUrl = res.data.secure_url;
    //showToast("success", "✅ Image uploaded successfully!");
    return imageUrl;
  } catch (err: any) {
    console.error("Error uploading image:", err);
    const errorMessage =
      err.response?.data?.message || "❌ An error occurred during upload.";
    // showToast("error", errorMessage);
    return null;
  }
};

export default uploadToCloudinary;
