// hooks/useModel.ts
'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {AnalyzeText, getUserAnalysis, SaveAnalysis, DeleteUserAnalysis, type TextSummaryRequest, type AnalysisResponse } from "@/lib/api";
import { toast } from "sonner";
import axios, { AxiosError } from 'axios';
import { useAuthStore } from "@/store/useAuthStore";

export const useModel = () => useMutation<AnalysisResponse, Error, TextSummaryRequest>({
  mutationFn: AnalyzeText,

  onSuccess: (data) => {
    toast.success('Analysis completed!');
    console.log('✅ Mutation completed successfully:', data);
  },

  onError: (error: unknown) => {
    console.error('❌ Mutation failed:', error);
    
    let errorMessage = 'Something went wrong. Please try again.';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ error?: string }>;
      errorMessage = axiosError.response?.data?.error || axiosError.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
  }
});

export const useSaveAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AnalysisResponse) => SaveAnalysis(data),
    onSuccess: () => {
      toast.success('✅ Analysis saved');
     queryClient.invalidateQueries({ queryKey: ['user-summary'] });

    },
    onError: (error: any) => {
      toast.error('❌ Save failed');
      console.error('Save mutation error:', error.message);
    },
  });
};
export const useGetAnalysis = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  return useQuery({
    queryKey: ['user-summary', user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error('User ID not available');
      }
      
      try {
        const result = await getUserAnalysis();
        return result || [];
      } catch (error) {
        console.error('Failed to fetch user analysis:', error);
        throw error;
      }
    },
    enabled: isAuthenticated && !!user?.id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchInterval: false,
    retry: (failureCount, error) => {
      if (error.message.includes('User ID not available')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useDeleteAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:DeleteUserAnalysis,
    onSuccess: () => {
      toast.success("🗑️ Analysis deleted");
      queryClient.invalidateQueries({ queryKey: ['user-summary'] });
    },
    onError: (error: any) => {
      toast.error(" Failed to delete analysis");
      console.error("Delete error:", error);
    },
  });
};