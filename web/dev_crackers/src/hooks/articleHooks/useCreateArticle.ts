import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToast from "../../components/common/ShowToast";
import { createNewArticleRequest } from "../ApiRequiests/allApiRquests";

const useCreateArticle = ({ handleReset }: any) => {
  // const queryClient = useQueryClient(); // Get the query client instance

  const {
    mutate: createArticle,
    isPending: createArticleLoading,
    isSuccess: isCreateArticleSuccess,
  } = useMutation({
    mutationFn: (payload: any) => createNewArticleRequest(payload),
    onSuccess: () => {
      showToast("success", "✅ New Article created successfully!");
      // queryClient.invalidateQueries(["groupsList"]);
      handleReset();
    },
    onError: (error: any) => {
      showToast(
        "error",
        `❌ Article creation failed: ${error?.response?.data?.message}`
      );
    },
  });

  return {
    createArticle,
    createArticleLoading,
    isCreateArticleSuccess,
  };
};

export default useCreateArticle;
