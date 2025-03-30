import { useMutation } from "@tanstack/react-query";
import { generateAssetsApiRequest } from "../ApiRequiests/otherApi";

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
  });

  return {
    generateAssets,
    generateAssetsLoading,
    isGenerateAssetsSuccess,
  };
};

export default useGenerateAssets;
