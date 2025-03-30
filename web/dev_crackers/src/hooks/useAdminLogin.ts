import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import showToast from "@/components/common/ShowToast";
import { adminLoginRequest } from "./ApiRequiests/otherApi";

const useLoginAdmin = () => {
  const router = useRouter();

  const {
    mutate: loginAdmin,
    data: success,
    isPending: isLoading,
    error: LoginError,
  } = useMutation({
    mutationFn: (payload: any) => adminLoginRequest(payload),
    onSuccess: (data) => {
      showToast("success", "✅ Admin logged in successfully!");
      localStorage.setItem("token", data?.token);
      Cookies.set("accessToken", data?.token, { expires: 7 });
      router.push("/admin/dashboard");
    },
    onError: (error: any) => {
      // console.log(error, "sdkwei");
      console.log(error, "error");

      showToast("error", `❌ Login failed: ${error?.response?.data?.message}`);
    },
  });

  return { loginAdmin, success, isLoading, LoginError };
};

export default useLoginAdmin;
