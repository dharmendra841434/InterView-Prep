import { useMutation } from "@tanstack/react-query";
import { generateAssetsApiRequest } from "../ApiRequiests/otherApi";
import showToast from "@/components/common/ShowToast";

const useGenerateAssets = ({ setAssets, type }: any) => {
  const {
    mutate: generateAssets,
    isPending: generateAssetsLoading,
    isSuccess: isGenerateAssetsSuccess,
  } = useMutation({
    mutationFn: (payload: { message: string }) =>
      generateAssetsApiRequest(payload, type),
    onSuccess: (data) => {
      console.log(data, "quiz data");
      setAssets(data?.message);
    },
    onError: (error) => {
      showToast("error", `Something went wrong try again`);
    },
  });

  return {
    generateAssets,
    generateAssetsLoading,
    isGenerateAssetsSuccess,
  };
};

export default useGenerateAssets;
