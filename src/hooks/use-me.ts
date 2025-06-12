import { useMutation, useQuery } from "@tanstack/react-query";
import { updateUser, getUserSummary, handlePasswordReset, handleRequest } from "@/lib/api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// No more API call needed - use session data directly
export const useMe = () => {
  const { data: session, status } = useSession();
  
  return {
    data: session?.user || null,
    isLoading: status === "loading",
    isError: status === "unauthenticated",
    error: status === "unauthenticated" ? new Error("Not authenticated") : null,
  };
};

export const useUpdateProfileMutation = () => {
  const { update: updateSession } = useSession();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (data) => {
      try {
        await updateSession({
          name: data.name,
          email: data.email,
        });
        
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Session update failed:", error);
        toast.success("Profile updated, please refresh the page.");
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || "Error updating profile";
      toast.error(errorMessage);
      console.error("Error updating profile:", error);
    },
  });
};

export const useUserSummary = () => {
  return useQuery({
    queryKey: ['user-summary'],
    queryFn: getUserSummary,
    staleTime: 1000 * 60 * 5,     
    refetchOnWindowFocus: true,   
    refetchInterval: false,       
    enabled: true,                
    retry: 1                      
  });
};

export const useHandleRequestToken = () => {
  return useMutation({
    mutationFn: handleRequest,
    onSuccess: async () => {
      toast.success("Reset token generated successfully.");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || "Failed to request reset token.";
      toast.error(errorMessage);
      console.error("Request token error:", error);
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
