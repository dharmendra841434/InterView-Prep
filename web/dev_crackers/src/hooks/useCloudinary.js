import { useState } from "react";
import axios from "axios";
import showToast from "@/components/common/ShowToast";

const useCloudinaryUpload = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0); // New state for progress

  const uploadFile = async (file) => {
    setLoading(true);
    setError(null);
    setProgress(0); // Reset progress before starting

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mystore");
    data.append("folder", "chatSystem");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/devtrendy/image/upload",
        data,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percentCompleted); // Update progress
          },
        }
      );

      setUrl(res.data.url);
      // showToast("success", "✅ Image uploaded successfully!");
      return res.data.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      const errorMessage =
        err.response?.data?.message || "❌ An error occurred during upload.";
      setError(errorMessage);
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { url, loading, error, progress, uploadFile }; // Include progress in return
};

export default useCloudinaryUpload;
