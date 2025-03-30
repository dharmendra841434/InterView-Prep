import { useMutation } from "@tanstack/react-query";
import showToast from "../../components/common/ShowToast";
import { createNewQuizRequest } from "../ApiRequiests/allApiRquests";

const useCreateQuiz = ({ handleReset }: any) => {
  // const queryClient = useQueryClient(); // Get the query client instance

  const {
    mutate: createQuiz,
    isPending: createQuizLoading,
    isSuccess: isCreateQuizSuccess,
  } = useMutation({
    mutationFn: (payload: any) => createNewQuizRequest(payload),
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
    createQuiz,
    createQuizLoading,
    isCreateQuizSuccess,
  };
};

export default useCreateQuiz;
