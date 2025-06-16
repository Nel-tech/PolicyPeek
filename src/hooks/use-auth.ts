import { useMutation, useQuery } from "@tanstack/react-query";
// import { updateUser, getUserSummary, handlePasswordReset, handleRequest } from "@/lib/api";
import {login, updateUser,verifyToken,handleRequest, handlePasswordReset  } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";



export const useLogin = () => {
  const router = useRouter();
  const loginToStore = useAuthStore((state) => state.login); 

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {

      loginToStore(data.user);

      toast.success("User successfully logged in.");
      router.push('/screen');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || "Failed to login.";
      toast.error(errorMessage);
      console.error("Login error:", error);
    },
  });
};

export const useUpdateProfileMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log("✅ Update success response:", data);

      if (data?.user) {
        setUser(data.user);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("User data missing in response.");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || "Error updating profile";
      toast.error(errorMessage);
      console.error("❌ Error updating profile:", error);
    },
  });
};
export const useHandleRequestToken = () => {
  return useMutation({
    mutationFn: handleRequest,
    onSuccess: (data: any) => {
      if (data.alreadyExists) {
        toast.info(`Please wait ${data.waitTime} minute(s) before requesting another token.`);
      } else {
        toast.success("Reset token generated successfully.");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || "Failed to request reset token.";
      toast.error(errorMessage);
    },
  });
};


export const useHandleResetPassword = () => {
  return useMutation({
    mutationFn: handlePasswordReset,
    onSuccess: async () => {
      toast.success("Password reset successfully.");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || "Failed to reset password.";
      toast.error(errorMessage);
      console.error("Password reset error:", error);
    },
  });
};
